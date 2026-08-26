const STABLE_WINDOW_MS = 1600;

function getPendingIdentity(message) {
  if (!message) {
    return null;
  }

  return `${message.role}:${message.seq}`;
}

function evaluateAssistantCompletion(runtime, message, now = Date.now()) {
  if (!message || message.role !== 'assistant') {
    return {
      done: true,
      pendingAssistant: null,
    };
  }

  const identity = getPendingIdentity(message);
  const previousPending = runtime.pendingAssistant;

  if (!previousPending || previousPending.identity !== identity) {
    return {
      done: false,
      pendingAssistant: {
        identity,
        lastText: message.text,
        stableSince: now,
      },
    };
  }

  if (previousPending.lastText !== message.text) {
    return {
      done: false,
      pendingAssistant: {
        identity,
        lastText: message.text,
        stableSince: now,
      },
    };
  }

  return {
    done: now - previousPending.stableSince >= STABLE_WINDOW_MS,
    pendingAssistant: previousPending,
  };
}

module.exports = {
  STABLE_WINDOW_MS,
  evaluateAssistantCompletion,
};
