module.exports = Ferdium =>
  class CustomWebsite extends Ferdium {
    async validateUrl() {
      return true;
    }
  };
