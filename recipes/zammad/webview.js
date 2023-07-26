function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = function getMessages() {
    const notificationsCounter = document.querySelector(
      '.js-notificationsCounter',
    );
    Ferdium.setBadge(Ferdium.safeParseInt(notificationsCounter.textContent));
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
