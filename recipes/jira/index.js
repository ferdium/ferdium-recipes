module.exports = Ferdium =>
  class Jira extends Ferdium {
    overrideUserAgent() {
      return window.navigator.userAgent
        .replaceAll(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '')
        .trim();
    }
  };
