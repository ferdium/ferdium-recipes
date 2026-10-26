function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const notifications = Ferdium.safeParseInt(
      document.querySelector('a[href="/notifications"] span')?.textContent,
    );

    const messages = Ferdium.safeParseInt(
      document.querySelector('a[href="/chats"] span')?.textContent,
    );

    Ferdium.setBadge(notifications + messages);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
