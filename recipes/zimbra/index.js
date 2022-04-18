module.exports = Ferdium =>
  class Zimbra extends Ferdium {
    async validateUrl() {
      return true;
    }
  };
