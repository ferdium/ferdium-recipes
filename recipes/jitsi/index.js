module.exports = Ferdium =>
  class Jitsi extends Ferdium {
    overrideUserAgent() {
      return window.navigator.userAgent
        .replaceAll(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '')
        .trim();
    }
  };
