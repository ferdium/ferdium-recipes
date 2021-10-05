module.exports = Ferdi =>
  class CustomWebsite extends Ferdi {
    async validateUrl() {
      return true;
    }
  };
