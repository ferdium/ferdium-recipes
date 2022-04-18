module.exports = Ferdium => class NextcloudCarnet extends Ferdium {
  buildUrl(url) {
    return `${url}/apps/carnet/`;
  }
};
