function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const notifications = document.querySelector(
      '.c-notifications-dropdown__count',
    );
    if (notifications) {
      Ferdium.setBadge(notifications.textContent);
    }
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
