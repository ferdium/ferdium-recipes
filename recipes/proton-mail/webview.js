function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let unreadCount = 0;
    // Take the counter element from the "Inbox" folder
    for (const counterElement of document.querySelectorAll(
      '[data-testid="navigation-link:inbox"] [data-testid="navigation-link:unread-count"]',
    )) {
      const unreadCounter = Ferdium.safeParseInt(counterElement.textContent);
      unreadCount = Math.max(unreadCount, unreadCounter);
    }

    Ferdium.setBadge(unreadCount);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
