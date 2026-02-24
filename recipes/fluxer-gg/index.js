module.exports = Ferdium =>
  class Fluxer extends Ferdium {
    overrideUserAgent() {
      return window.navigator.userAgent.replace(
        /(Ferdium|Electron)\/\S+ \([^)]+\)/g,
        '',
      );
    }
  };
