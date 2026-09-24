module.exports = Ferdium =>
  class Soapbox extends Ferdium {
    async validateUrl(url) {
      try {
        // Soapbox uses Pleroma as backend
        const resp = await window.fetch(`${url}/api/v1/instance`, {
          Accept: 'application/json',
        });
        const data = await resp.json();
        const version = data.version;
        return typeof version === 'string' && version.includes('Pleroma');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Pleroma server validation error', error);
      }
      return false;
    }
  };
