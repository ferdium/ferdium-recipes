function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const numMessages = Ferdium.safeParseInt(
      document.querySelector(
        '.left-nav [data-content="Inbox"] .unread__container .unread',
      ).textContent,
    );
    Ferdium.setBadge(numMessages);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
