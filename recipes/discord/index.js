module.exports = Ferdium => class Discord extends Ferdium {
  overrideUserAgent() {
    return window.navigator.userAgent.replace("Apple Mac OS X", "Intel Mac OS X");
  }
};
