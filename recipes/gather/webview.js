const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    const element = document.querySelector("[aria-label='Chat'] > div > div > p");
    Ferdium.setBadge(element ? Ferdium.safeParseInt(element.textContent) : 0);
  }

  Ferdium.loop(getMessages);
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
