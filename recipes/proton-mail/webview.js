function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let unreadCount = 0;
    // Loop over all displayed counters and take the highest one (from the "All Mail" folder)
    for (const counterElement of document.querySelectorAll(
      '.navigation-counter-item',
    )) {
      const unreadCounter = Ferdium.safeParseInt(counterElement.textContent);
      unreadCount = Math.max(unreadCount, unreadCounter);
    }

    Ferdium.setBadge(unreadCount);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
