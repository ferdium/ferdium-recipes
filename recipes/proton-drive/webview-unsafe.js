const notImplemented = () => {
  console.warn('chrome.runtime is not implemented');
};

window.chrome = {
  runtime: {
    connect: () => ({
      onMessage: {
        addListener: notImplemented,
        removeListener: notImplemented,
      },
      postMessage: notImplemented,
      disconnect: notImplemented,
    }),
  },
};
