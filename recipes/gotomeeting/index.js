module.exports = Ferdium =>
  class Gotomeeting extends Ferdium {
    overrideUserAgent() {
      return window.navigator.userAgent.replaceAll(
        /(Ferdium|Electron)\/\S+ \([^)]+\)/g,
        '',
      );
    }
  };
