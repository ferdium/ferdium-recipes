function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  function getNotifications() {
    let unreadNotifications = 0;
    for (const notificationCounterElement of document.querySelectorAll(
      '.notification__count',
    )) {
      unreadNotifications += Ferdium.safeParseInt(
        notificationCounterElement.textContent,
      );
    }

    Ferdium.setBadge(unreadNotifications);
  }
  Ferdium.loop(getNotifications);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
