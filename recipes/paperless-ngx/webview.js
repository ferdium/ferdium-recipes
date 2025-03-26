function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const notificationsElement = document.querySelectorAll(
      '.list-group-item .badge.rounded-pill',
    )[0];
    const notificationText = notificationsElement
      ? notificationsElement.textContent.trim()
      : '0';
    const notificationCount =
      notificationText !== '0' &&
      notificationsElement.classList.contains('bg-primary')
        ? Number.parseInt(notificationText)
        : 0;
    Ferdium.setBadge(notificationCount);
  };
  Ferdium.loop(getMessages);
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
