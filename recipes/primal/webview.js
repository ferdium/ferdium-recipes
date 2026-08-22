function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  Ferdium.handleDarkMode(isEnabled => {
    localStorage.setItem('theme', isEnabled ? 'midnight' : 'ice');
  });

  const getMessages = () => {
    let direct = 0;

    // "Notifications" and "Messages". Sum the values for direct badge.
    const notificationsElement = document.querySelector(
      'a[href="/notifications"]',
    ).nextSibling;
    if (notificationsElement) {
      direct += Ferdium.safeParseInt(notificationsElement.textContent);
    }
    const DMElement = document.querySelector(
      'a[href="/dms"]',
    ).nextSibling;
    if (DMElement) {
      direct += Ferdium.safeParseInt(DMElement.textContent);
    }

    Ferdium.setBadge(direct);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
