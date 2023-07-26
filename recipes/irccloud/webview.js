function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const directMessages = document.querySelectorAll(
      '.buffer.conversation.active.unread.activeBadge',
    ).length;
    const indirectMessages = document.querySelectorAll(
      '.buffer.channel.active.unread',
    ).length;

    Ferdium.setBadge(directMessages, indirectMessages);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
