module.exports = Ferdium =>
  class Threads extends Ferdium {
    overrideUserAgent() {
      return window.navigator.userAgent
        .replaceAll(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '')
        .trim();
    }
  };
