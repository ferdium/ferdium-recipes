function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const unreadMessageCountElement = document.querySelector(
      '#notifications-anchor .badge',
    );
    const unreadMessagesCount = Ferdium.safeParseInt(
      unreadMessageCountElement.textContent,
    );
    Ferdium.setBadge(unreadMessagesCount, 0);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
