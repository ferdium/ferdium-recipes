const { parseChatDOM } = require('./parser/parse');

function normalizeMessage(message, index) {
  const markdown = typeof message?.md === 'string' ? message.md.trim() : '';
  const text =
    typeof message?.text === 'string' ? message.text.trim() : markdown;

  if (!text) {
    return null;
  }

  return {
    seq: index + 1,
    role: message.role || 'assistant',
    text,
    markdown,
    html: typeof message?.html === 'string' ? message.html : undefined,
    id: message.id || `msg-${index + 1}`,
  };
}

function getConversationFingerprint(conversation) {
  return JSON.stringify({
    currentUrl: conversation.currentUrl,
    title: conversation.title,
    messageCount: conversation.messageCount,
    messageIds: conversation.messages.map(message => message.id),
  });
}

module.exports = Ferdium => {
  const LOG_PREFIX = '[AI-HUB][chatgpt-local]';
  const HOST_CHANNEL = 'aihub-scan-messages';
  const AUTO_SCAN_DELAY_MS = 1800;

  let lastLocationHref = window.location.href;
  let lastConversationFingerprint = null;
  let autoScanTimer = null;

  Ferdium.handleDarkMode(isEnabled => {
    localStorage.setItem('theme', isEnabled ? 'dark' : 'light');
  });

  function scanConversation() {
    const parsed = parseChatDOM('chatgpt', document);
    const messages = (parsed.messages || [])
      .map((message, index) => normalizeMessage(message, index))
      .filter(Boolean);

    return {
      platform: 'chatgpt',
      title: parsed.title || document.title || 'Conversation',
      model: parsed.model,
      currentUrl: window.location.href,
      messageCount: messages.length,
      messages,
    };
  }

  function emitConversationToHost(conversation) {
    if (!Ferdium?.ipcRenderer?.sendToHost) {
      console.warn(`${LOG_PREFIX} sendToHost unavailable`);
      return false;
    }

    Ferdium.ipcRenderer.sendToHost(HOST_CHANNEL, conversation);
    return true;
  }

  function debugScanMessages(reason = 'manual', force = false) {
    const conversation = scanConversation();

    if (!conversation.messageCount) {
      console.log(`${LOG_PREFIX} skipped empty scan`, {
        reason,
        currentUrl: conversation.currentUrl,
      });
      return conversation;
    }

    const fingerprint = getConversationFingerprint(conversation);

    if (!force && fingerprint === lastConversationFingerprint) {
      console.log(`${LOG_PREFIX} skipped unchanged scan`, {
        reason,
        currentUrl: conversation.currentUrl,
        title: conversation.title,
      });
      return conversation;
    }

    lastConversationFingerprint = fingerprint;

    console.log(`${LOG_PREFIX} scanned messages`, {
      ...conversation,
      reason,
    });
    emitConversationToHost(conversation);
    return conversation;
  }

  function scheduleAutoScan(reason) {
    window.clearTimeout(autoScanTimer);
    autoScanTimer = window.setTimeout(() => {
      debugScanMessages(reason);
    }, AUTO_SCAN_DELAY_MS);
  }

  function installAutoScanWatcher() {
    window.setInterval(() => {
      const nextHref = window.location.href;

      if (nextHref === lastLocationHref) {
        return;
      }

      lastLocationHref = nextHref;
      scheduleAutoScan('url-change');
    }, 1000);
  }

  function installMainWorldHelpers() {
    if (!Ferdium?.ipcRenderer?.sendToHost) {
      return;
    }

    const injectedScript = `
      window.__AI_HUB_RESCAN_CURRENT_CONVERSATION = () => {
        if (window.ferdium?.aiHubRescanConversation) {
          window.ferdium.aiHubRescanConversation();
          return 'aihub-rescan-dispatched';
        }

        return 'aihub-rescan-unavailable';
      };
    `;

    Ferdium.ipcRenderer.sendToHost('inject-js-unsafe', injectedScript);
  }

  window.__aiHubChatGPTLocalScanConversation = scanConversation;
  window.__aiHubChatGPTLocalDebugScanMessages = debugScanMessages;

  if (typeof Ferdium?.setRescanConversationHandler === 'function') {
    Ferdium.setRescanConversationHandler(debugScanMessages);
  } else {
    console.warn(`${LOG_PREFIX} setRescanConversationHandler unavailable`);
  }

  installMainWorldHelpers();
  installAutoScanWatcher();

  window.addEventListener('load', () => {
    installMainWorldHelpers();
    scheduleAutoScan('load');
  });
};
