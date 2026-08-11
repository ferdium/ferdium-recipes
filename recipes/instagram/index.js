module.exports = Ferdium =>
  class Instagram extends Ferdium {
    overrideUserAgent() {
      return window.navigator.userAgent
        .replace(
          /\(Macintosh; Apple macOS [^)]+\)/,
          '(Macintosh; Intel Mac OS X 10_15_7)',
        )
        .replace(/\b(?:Ferdium|Electron)\/\S+/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
    }
  };
