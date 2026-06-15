module.exports = Ferdium =>
  class Friendica extends Ferdium {
    async validateUrl(url) {
      try {
        const resp = await window.fetch(`${url}/nodeinfo/2.0`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await resp.json();
        return data?.software?.name?.toLowerCase() === 'friendica';
      } catch (error) {
        console.error(error);
      }
      return false;
    }
  };
