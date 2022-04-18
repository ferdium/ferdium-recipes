module.exports = Ferdium => class Instagram extends Ferdium {
  overrideUserAgent() {
    return window.navigator.userAgent.replace(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '').trim();
  }
};
