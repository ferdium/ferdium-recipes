module.exports = Ferdium => class Pleroma extends Ferdium {
  async validateUrl(url) {
    try {
      const resp = await window.fetch(`${url}/api/v1/instance`, {
        Accept: 'application/json',
      });
      const data = await resp.json();
      const version = data.version;
      return typeof (version) === 'string' && version.includes('Pleroma');
    } catch (error) {
      console.log('Pleroma server validation error', error);
    }
    return false;
  }

  buildUrl(url) {
    return `${url}/main/friends`;
  }
};
