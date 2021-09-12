const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (Franz) => {
  function getMessages() {
    let direct = 0;
    let indirect = 0;
    const data = document.querySelector('#FranzMessages').dataset;
    if (data) {
      direct = data.direct;
      indirect = data.indirect;
    }

    Franz.setBadge(direct, indirect);
  }

  Franz.loop(getMessages);
  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
}
