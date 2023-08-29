function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const element = document.querySelector('.notification-count');
    Ferdium.setBadge(
      element ? Ferdium.safeParseInt(element.textContent.match(/\d+/)[0]) : 0,
    );
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
