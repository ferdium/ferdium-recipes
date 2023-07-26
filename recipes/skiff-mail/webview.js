function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const element = document.querySelector('div[href="/mail/inbox"]');
    const matches = element.textContent.match(/\d+/);
    const unreadCount = Ferdium.safeParseInt(matches ? matches[0] : 0);
    Ferdium.setBadge(unreadCount);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
