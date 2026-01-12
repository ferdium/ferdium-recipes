function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const hasUnreads = !!document.querySelector(
      '.unread-icon,.contact aside p',
    );
    const count = document
      .querySelectorAll('.contact aside p')
      .values()
      .map(el => Ferdium.safeParseInt(el.textContent) || 1)
      .reduce((a, b) => a + b, 0);

    Ferdium.setBadge(count || +hasUnreads);
  };

  const getDialogTitle = () => {
    const username = location.pathname.match(/^\/inbox\/([^/]+)/)?.[1];
    Ferdium.setDialogTitle(username ?? null);
  };

  Ferdium.loop(() => {
    getMessages();
    getDialogTitle();
  });

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
