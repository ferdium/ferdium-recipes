module.exports = Ferdium => class RocketChat extends Ferdium {
  async validateUrl(url) {
    try {
      const resp = await window.fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const status = resp.status.toString();
      return status.startsWith('2') || status.startsWith('3');
    } catch (error) {
      console.error(error);
    }

    return false;
  }
};
