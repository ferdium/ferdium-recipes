function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  // TODO: If your Notion Mail service has unread messages, uncomment these lines to implement the logic for updating the badges
  const getMessages = () => {
    let inboxCount = 0;
    inboxCount = document.querySelectorAll('.jnEPWk')[0]
      ? Ferdium.safeParseInt(
          document.querySelectorAll('.jnEPWk')[0].textContent,
        )
      : 0;

    Ferdium.setBadge(inboxCount, 0);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
