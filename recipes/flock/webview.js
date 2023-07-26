function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const allMessages = Ferdium.safeParseInt(
      document.querySelector('.team-counter').textContent,
    );
    Ferdium.setBadge(allMessages);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
