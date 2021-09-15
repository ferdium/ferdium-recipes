module.exports = (Ferdi) =>
  class Pipefy extends Ferdi {
    overrideUserAgent() {
      return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:72.0) Gecko/20100101 Firefox/72.0";
    }
  };
