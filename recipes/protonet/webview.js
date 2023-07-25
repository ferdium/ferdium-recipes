function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const unreadPrivateMessages = Ferdium.safeParseInt(
      $('.messages .unread-meeps').text(),
    );
    const unreadGroupMessages = Ferdium.safeParseInt(
      $('.today .unread-meeps').text(),
    );

    Ferdium.setBadge(unreadPrivateMessages + unreadGroupMessages);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
