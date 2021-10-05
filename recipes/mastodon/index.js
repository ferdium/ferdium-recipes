module.exports = Ferdi => {
  class Mastodon extends Ferdi {
    validateServer(URL) {
      const api = `${URL}`;
      return new Promise((resolve, reject) => {
        $.get(api, () => {
          resolve();
        }).fail(reject);
      });
    }
  }

  return Mastodon;
};
