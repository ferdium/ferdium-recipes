module.exports = Ferdi =>
  class Zimbra extends Ferdi {
    async validateUrl() {
      return true;
    }
  };
