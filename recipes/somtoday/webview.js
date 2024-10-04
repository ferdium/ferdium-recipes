function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  function getMessages() {
    let direct = 0;
    let indirect = 0;
    const FerdiumData = document.querySelector('#FerdiumMessages').dataset;
    if (FerdiumData) {
      direct = FerdiumData.direct;
      indirect = FerdiumData.indirect;
    }

    Ferdium.setBadge(direct, indirect);
  }

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
  Ferdium.loop(getMessages);
};
