module.exports = Ferdium =>
  class Affine extends Ferdium {
    buildUrl(url) {
      return `${url}`;
    }
  };
