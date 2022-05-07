module.exports = Ferdium => class Zulip extends Ferdium {
  async validateUrl(url) {
    const baseUrl = new window.URL(url);
    const apiVersion = 'api/v1';
    try {
      const resp = await window.fetch(`${baseUrl.origin}/${apiVersion}/server_settings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await resp.json();

      return Object.hasOwnProperty.call(data, 'realm_uri');
    } catch (error) {
      console.error(error);
    }

    return false;
  }
};
