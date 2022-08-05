module.exports = Ferdium =>
  class Grammarly extends Ferdium {
    async validateUrl() {
      return true;
    }
  };
