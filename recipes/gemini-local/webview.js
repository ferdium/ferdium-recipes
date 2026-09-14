const { parseChatDOM } = require('./parser/parse');

const HOST_CHANNEL = 'aihub-scan-messages';
const LOG_PREFIX = '[AI-HUB][gemini-local]';

function shortHash(value) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = Math.trunc((hash << 5) - hash + (value.codePointAt(index) || 0));
  }

  return Math.abs(hash).toString(16).slice(0, 8);
}

function getGeminiConversationKeyFromUrl(currentUrl) {
  if (!currentUrl) {
    return 'gemini:unknown-conversation';
  }

  try {
    const url = new URL(currentUrl);
    const pathMatch = url.pathname.match(/\/app\/([^#/?]+)/);
    const paramKey =
      url.searchParams.get('conversation') ||
      url.searchParams.get('id') ||
      url.searchParams.get('chat') ||
      url.searchParams.get('c');

    if (pathMatch?.[1]) {
      return pathMatch[1];
    }

    if (paramKey) {
      return paramKey;
    }

    const domKey =
      document
        .querySelector('[data-conversation-id], [data-chat-id], [data-id]')
        ?.getAttribute('data-conversation-id') ||
      document
        .querySelector('[data-conversation-id], [data-chat-id], [data-id]')
        ?.getAttribute('data-chat-id') ||
      document
        .querySelector('[data-conversation-id], [data-chat-id], [data-id]')
        ?.getAttribute('data-id');

    if (domKey) {
      return domKey;
    }

    const normalizedPath = `${url.origin}${url.pathname}`;
    const title = (document.title || 'Conversation').trim();

    return `gemini:${normalizedPath}:${shortHash(title)}`;
  } catch {
    return `gemini:${currentUrl}`;
  }
}

function isGeminiConversationPage(currentUrl = window.location.href) {
  return (
    /gemini\.google\.com/.test(currentUrl) && /\/app(\/|$|\?)/.test(currentUrl)
  );
}

function normalizeMessage(message, index, conversationKey) {
  const markdown = typeof message?.md === 'string' ? message.md.trim() : '';
  const text =
    typeof message?.text === 'string' ? message.text.trim() : markdown;

  if (!text) {
    return null;
  }

  const role = message.role || 'assistant';
  const seq = index + 1;

  return {
    seq,
    role,
    text,
    markdown,
    html: typeof message?.html === 'string' ? message.html : undefined,
    id: message.id || `msg-${seq}`,
    messageKey: `${conversationKey}:${role}:${seq}:${shortHash(text)}`,
  };
}

function scanConversation() {
  const currentUrl = window.location.href;
  const conversationKey = getGeminiConversationKeyFromUrl(currentUrl);
  const parsed = parseChatDOM('gemini', document, {
    deepResearch: {
      pureMode: false,
    },
  });
  const messages = (parsed.messages || [])
    .map((message, index) => normalizeMessage(message, index, conversationKey))
    .filter(Boolean);

  return {
    platform: 'gemini',
    conversationKey,
    title: parsed.title || document.title || 'Conversation',
    model: parsed.model,
    currentUrl,
    messageCount: messages.length,
    messages,
  };
}

module.exports = Ferdium => {
  Ferdium.handleDarkMode(isEnabled => {
    localStorage.setItem('theme', isEnabled ? 'dark' : 'light');
  });

  function emitConversationToHost(conversation) {
    if (!Ferdium?.ipcRenderer?.sendToHost) {
      console.warn(`${LOG_PREFIX} sendToHost unavailable`);
      return false;
    }

    Ferdium.ipcRenderer.sendToHost(HOST_CHANNEL, conversation);
    return true;
  }

  function rescanCurrentConversation(reason = 'manual-rescan') {
    if (!isGeminiConversationPage()) {
      console.log(`${LOG_PREFIX} skip scan outside conversation page`, {
        reason,
        currentUrl: window.location.href,
      });
      return 'aihub-rescan-skipped';
    }

    const conversation = scanConversation();

    console.log(`${LOG_PREFIX} scanned messages`, {
      ...conversation,
      reason,
    });

    if (!conversation.messageCount) {
      console.log(`${LOG_PREFIX} empty conversation scan`, {
        reason,
        currentUrl: conversation.currentUrl,
      });
      return 'aihub-rescan-empty';
    }

    emitConversationToHost(conversation);
    return 'aihub-rescan-dispatched';
  }

  if (typeof window !== 'undefined') {
    window.__AI_HUB_RESCAN_CURRENT_CONVERSATION = () =>
      rescanCurrentConversation('manual-window-hook');
  }

  console.log(`${LOG_PREFIX} ready`, {
    currentUrl: window.location.href,
    manualRescanHook: '__AI_HUB_RESCAN_CURRENT_CONVERSATION',
  });
};
