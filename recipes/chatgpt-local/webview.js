const { parseChatDOM } = require('./parser/parse');
const {
  createConversationRuntime,
  destroyRuntime,
  destroyObserver,
  clearDebounceTimer,
  clearCompletionTimer,
} = require('./parser/incremental/conversationRuntime');
const {
  installMutationObserver,
} = require('./parser/incremental/mutationObserver');
const { diffMessages } = require('./parser/incremental/diffMessages');
const {
  STABLE_WINDOW_MS,
  evaluateAssistantCompletion,
} = require('./parser/incremental/completionDetector');
const {
  emitIncrementalResult,
} = require('./parser/incremental/emitScanResult');

const HOST_CHANNEL = 'aihub-scan-messages';
const LOG_PREFIX = '[AI-HUB][chatgpt-local]';
const AUTO_SCAN_DELAY_MS = 1800;
const INCREMENTAL_DEBOUNCE_MS = 1000;

function shortHash(value) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = Math.trunc((hash << 5) - hash + (value.codePointAt(index) || 0));
  }

  return Math.abs(hash).toString(16).slice(0, 8);
}

function getConversationKeyFromUrl(currentUrl) {
  if (!currentUrl) {
    return 'unknown-conversation';
  }

  const match = currentUrl.match(/\/c\/([^#/?]+)/);

  return match?.[1] || currentUrl;
}

function isConversationPage(currentUrl = window.location.href) {
  return /\/c\/[^#/?]+/.test(currentUrl);
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

function getConversationFingerprint(conversation) {
  return JSON.stringify({
    currentUrl: conversation.currentUrl,
    title: conversation.title,
    messageCount: conversation.messageCount,
    messageKeys: conversation.messages.map(message => message.messageKey),
    texts: conversation.messages.map(message => message.text),
  });
}

module.exports = Ferdium => {
  const runtime = createConversationRuntime();

  let lastLocationHref = window.location.href;
  let lastConversationFingerprint = null;
  let autoScanTimer = null;

  Ferdium.handleDarkMode(isEnabled => {
    localStorage.setItem('theme', isEnabled ? 'dark' : 'light');
  });

  function scanConversation() {
    const currentUrl = window.location.href;
    const conversationKey = getConversationKeyFromUrl(currentUrl);
    const parsed = parseChatDOM('chatgpt', document);
    const messages = (parsed.messages || [])
      .map((message, index) =>
        normalizeMessage(message, index, conversationKey),
      )
      .filter(Boolean);

    return {
      platform: 'chatgpt',
      conversationKey,
      title: parsed.title || document.title || 'Conversation',
      model: parsed.model,
      currentUrl,
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

  function setBaselineConversation(conversation) {
    runtime.conversationKey = conversation.conversationKey;
    runtime.baselineMessages = [...conversation.messages];
    runtime.pendingAssistant = null;
    runtime.status = 'observing';
    lastConversationFingerprint = getConversationFingerprint(conversation);
  }

  function scheduleCompletionCheck(reason = 'completion-check') {
    clearCompletionTimer(runtime);
    runtime.completionTimer = window.setTimeout(() => {
      runIncrementalScan(reason);
    }, STABLE_WINDOW_MS);
  }

  function emitIncrementalPayload(
    mode,
    conversation,
    messages = [],
    updatedTail = null,
  ) {
    return emitIncrementalResult(
      Ferdium,
      {
        vendor: 'chatgpt',
        conversationKey: conversation.conversationKey,
        sourceUrl: conversation.currentUrl,
        currentUrl: conversation.currentUrl,
        title: conversation.title,
        model: conversation.model,
        mode,
        messages,
        updatedTail,
        scannedAt: new Date().toISOString(),
      },
      LOG_PREFIX,
    );
  }

  function installIncrementalObserver() {
    destroyObserver(runtime);

    if (!isConversationPage()) {
      return;
    }

    const observer = installMutationObserver({
      doc: document,
      onMutate: () => {
        scheduleIncrementalScan('mutation');
      },
    });

    if (!observer) {
      console.warn(
        `${LOG_PREFIX} observer root unavailable, falling back to rescans`,
      );
      return;
    }

    runtime.observer = observer;
  }

  function bootstrapConversation(reason = 'bootstrap', force = false) {
    clearDebounceTimer(runtime);
    clearCompletionTimer(runtime);

    const conversation = scanConversation();

    if (!conversation.messageCount) {
      console.log(`${LOG_PREFIX} skipped empty bootstrap`, {
        reason,
        currentUrl: conversation.currentUrl,
      });
      return conversation;
    }

    const fingerprint = getConversationFingerprint(conversation);

    if (!force && fingerprint === lastConversationFingerprint) {
      installIncrementalObserver();
      return conversation;
    }

    console.log(`${LOG_PREFIX} scanned messages`, {
      ...conversation,
      reason,
    });
    emitConversationToHost(conversation);
    setBaselineConversation(conversation);
    installIncrementalObserver();
    return conversation;
  }

  function runIncrementalScan(reason = 'mutation') {
    const scanReason = reason;
    runtime.status = 'rescanning';

    if (!isConversationPage()) {
      destroyRuntime(runtime);
      return null;
    }

    const conversation = scanConversation();

    if (!conversation.messageCount) {
      runtime.status = 'observing';
      return conversation;
    }

    if (
      runtime.conversationKey &&
      conversation.conversationKey !== runtime.conversationKey
    ) {
      return bootstrapConversation('conversation-key-change', true);
    }

    const delta = diffMessages(runtime.baselineMessages, conversation.messages);

    if (delta.type === 'noop') {
      runtime.status = 'observing';
      return conversation;
    }

    if (delta.type === 'rescan') {
      emitIncrementalPayload('rescan', conversation, conversation.messages);
      setBaselineConversation(conversation);
      runtime.status = 'observing';
      return conversation;
    }

    if (delta.type === 'bootstrap') {
      emitIncrementalPayload('bootstrap', conversation, conversation.messages);
      setBaselineConversation(conversation);
      runtime.status = 'observing';
      return conversation;
    }

    if (delta.type === 'append') {
      let appendedMessages = [...delta.appended];
      const trailingAssistant = appendedMessages.at(-1);

      if (trailingAssistant?.role === 'assistant') {
        const completion = evaluateAssistantCompletion(
          runtime,
          trailingAssistant,
        );
        runtime.pendingAssistant = completion.pendingAssistant;

        if (completion.done) {
          runtime.pendingAssistant = null;
        } else {
          appendedMessages = appendedMessages.slice(0, -1);
          scheduleCompletionCheck('assistant-stable-check');
        }
      } else {
        runtime.pendingAssistant = null;
      }

      if (appendedMessages.length > 0) {
        emitIncrementalPayload('append', conversation, appendedMessages);
        runtime.baselineMessages = [
          ...runtime.baselineMessages,
          ...appendedMessages,
        ];
        lastConversationFingerprint = getConversationFingerprint({
          ...conversation,
          messages: runtime.baselineMessages,
          messageCount: runtime.baselineMessages.length,
        });
      }

      runtime.status = 'observing';
      return conversation;
    }

    if (delta.type === 'update-tail' && delta.updatedTail) {
      const completion = evaluateAssistantCompletion(
        runtime,
        delta.updatedTail,
      );
      runtime.pendingAssistant = completion.pendingAssistant;

      if (completion.done) {
        runtime.pendingAssistant = null;
        emitIncrementalPayload(
          'update-tail',
          conversation,
          [],
          delta.updatedTail,
        );
        runtime.baselineMessages = [
          ...runtime.baselineMessages.slice(0, -1),
          delta.updatedTail,
        ];
        lastConversationFingerprint = getConversationFingerprint({
          ...conversation,
          messages: runtime.baselineMessages,
          messageCount: runtime.baselineMessages.length,
        });
        runtime.status = 'observing';
        return conversation;
      }

      scheduleCompletionCheck('assistant-tail-stable-check');
      runtime.status = 'observing';
      return conversation;
    }

    if (scanReason === 'mutation') {
      runtime.status = 'observing';
      return conversation;
    }

    runtime.status = 'observing';
    return conversation;
  }

  function debugScanMessages(reason = 'manual', force = false) {
    return bootstrapConversation(reason, force);
  }

  function scheduleAutoScan(reason) {
    window.clearTimeout(autoScanTimer);
    autoScanTimer = window.setTimeout(() => {
      bootstrapConversation(reason);
    }, AUTO_SCAN_DELAY_MS);
  }

  function scheduleIncrementalScan(reason) {
    clearDebounceTimer(runtime);
    runtime.debounceTimer = window.setTimeout(() => {
      runIncrementalScan(reason);
    }, INCREMENTAL_DEBOUNCE_MS);
  }

  function installAutoScanWatcher() {
    window.setInterval(() => {
      const nextHref = window.location.href;

      if (nextHref === lastLocationHref) {
        return;
      }

      lastLocationHref = nextHref;
      destroyRuntime(runtime);
      lastConversationFingerprint = null;
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
