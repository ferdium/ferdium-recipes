module.exports = Franz =>
  class Instagram extends Franz {
    // Fixes
    overrideUserAgent() {
      return "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36";
    }
  };
