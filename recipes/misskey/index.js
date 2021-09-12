module.exports = Ferdi => class Misskey extends Ferdi {
  constructor(...args) {
    let _temp;
    return _temp = super(...args), this.events = {
    }, _temp;
  }

  async validateUrl(url) {
    try {
      const res = await window.fetch(`${url}/api/stats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      // check any field in API response
      return [
        'originalUsersCount', 'usersCount', 'notesCount', 'originalNotesCount'
      ].reduce((r, key) => (
        r && Object.hasOwnProperty.call(data, 'uri')
      ), true);
    } catch (err) {
      console.error(err);
    }
    return false;
  }
};
