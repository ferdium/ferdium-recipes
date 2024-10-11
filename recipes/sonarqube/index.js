module.exports = Ferdium =>
  class SonarQube extends Ferdium {
    buildUrl(url) {
      return `${url}/`;
    }
  };
