function createConversationRuntime() {
  return {
    conversationKey: null,
    observer: null,
    debounceTimer: null,
    completionTimer: null,
    baselineMessages: [],
    status: 'idle',
    pendingAssistant: null,
  };
}

function resetRuntime(runtime, conversationKey = null) {
  runtime.conversationKey = conversationKey;
  runtime.baselineMessages = [];
  runtime.pendingAssistant = null;
  runtime.status = 'idle';
}

function destroyObserver(runtime) {
  if (runtime.observer) {
    runtime.observer.disconnect();
    runtime.observer = null;
  }
}

function clearDebounceTimer(runtime) {
  if (runtime.debounceTimer) {
    window.clearTimeout(runtime.debounceTimer);
    runtime.debounceTimer = null;
  }
}

function clearCompletionTimer(runtime) {
  if (runtime.completionTimer) {
    window.clearTimeout(runtime.completionTimer);
    runtime.completionTimer = null;
  }
}

function destroyRuntime(runtime) {
  destroyObserver(runtime);
  clearDebounceTimer(runtime);
  clearCompletionTimer(runtime);
  resetRuntime(runtime);
}

module.exports = {
  createConversationRuntime,
  resetRuntime,
  destroyObserver,
  clearDebounceTimer,
  clearCompletionTimer,
  destroyRuntime,
};
