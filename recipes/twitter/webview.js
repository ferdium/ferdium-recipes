function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let direct = 0;

    // "Notifications" and "Messages" - aria-label ending in
    // "unread items". Sum the values for direct badge.
    const notificationsElement = document.querySelector(
      '[data-testid=AppTabBar_Notifications_Link] div div div',
    );
    if (notificationsElement) {
      direct += Ferdium.safeParseInt(notificationsElement.textContent);
    }
    const DMElement = document.querySelector(
      '[data-testid=AppTabBar_DirectMessage_Link] div div div',
    );
    if (DMElement) {
      direct += Ferdium.safeParseInt(DMElement.textContent);
    }

    Ferdium.setBadge(direct);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
