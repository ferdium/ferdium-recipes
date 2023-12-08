function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const newCountMatch = document
    .querySelector('a.h6[href="/notifications?query="]')
    ?.textContent?.match(/\d+/);
  const getMessages = () => {
    Ferdium.setBadge(
      Ferdium.safeParseInt(
        document.querySelector('.filter-list.js-notification-inboxes .count')
          ?.textContent,
      ) + Ferdium.safeParseInt(newCountMatch ? newCountMatch[0] : 0),
      document.querySelectorAll(
        '#AppHeader-notifications-button.AppHeader-button--hasIndicator',
      ).length,
    );
  };
  Ferdium.loop(getMessages);
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
