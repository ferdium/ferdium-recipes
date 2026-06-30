module.exports = Ferdium =>
  class CrmAi2n extends Ferdium {
    async validateUrl(url) {
      try {
        const resp = await window.fetch(url, {
          method: "HEAD",
          credentials: "include",
        });
        return resp.ok;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  };
