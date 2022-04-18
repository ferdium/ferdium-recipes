const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    const inbox = document.querySelector(
      '.v-MailboxSource--inbox .v-MailboxSource-badge',
    );

    const messages = inbox ? Ferdium.safeParseInt(inbox.textContent) : 0;
    Ferdium.setBadge(messages);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectJSUnsafe(_path.default.join(__dirname, 'webview-unsafe.js'));
};
