module.exports = Ferdium => {
  class Mastodon extends Ferdium {
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
