const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    const unreadCountElement = document.querySelector("[aria-label='Chat'] > div > div > p");
    if (unreadCountElement !== null) {
      const unreadCount = unreadCountElement.textContent * 1;
      Ferdium.setBadge(unreadCount);
    } else {
      Ferdium.setBadge(0);
    }
  }

  Ferdium.loop(getMessages);
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
