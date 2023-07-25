function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  function getUnreadConversations() {
    Ferdium.setBadge(
      document.querySelector('#unread-conversations').textContent,
    );
  }

  Ferdium.loop(getUnreadConversations);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
