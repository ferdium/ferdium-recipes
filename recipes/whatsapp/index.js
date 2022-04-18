module.exports = (Ferdium) => class Messenger extends Ferdium {
  overrideUserAgent() {
    return window.navigator.userAgent.replace(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '').trim();
  }

  modifyRequestHeaders() {
    return [
      {
        headers: {
          'user-agent': window.navigator.userAgent.replace(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '').trim(),
        },
        requestFilters: {
          urls: ['*://*/*'],
        },
      },
    ];
  }
};
