module.exports = Ferdium =>
  class Misskey extends Ferdium {
    constructor(...args) {
      let _temp;
      // eslint-disable-next-line constructor-super
      return (_temp = super(...args)), (this.events = {}), _temp;
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
          'originalUsersCount',
          'usersCount',
          'notesCount',
          'originalNotesCount',
        ].reduce(r => r && Object.hasOwnProperty.call(data, 'uri'), true);
      } catch (error) {
        console.error(error);
      }
      return false;
    }
  };
