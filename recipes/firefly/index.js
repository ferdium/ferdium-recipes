module.exports = Ferdium =>
  class Firefly extends Ferdium {
    buildUrl(url) {
      return `${url}/`;
    }
  };
