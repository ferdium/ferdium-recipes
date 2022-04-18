module.exports = Ferdium => class Nextcloud extends Ferdium {
  buildUrl(url) {
    return `${url}/`;
  }
};
