module.exports = Ferdium =>
  class Messenger extends Ferdium {
    overrideUserAgent() {
      return window.navigator.userAgent
        .replaceAll(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '')
        .trim();
    }
  };
