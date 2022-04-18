const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    let messages = 0;
    const badge = document.querySelector(
      '.activity-badge.dot-activity-badge .activity-badge',
    );
    if (badge) {
      messages = Ferdium.safeParseInt(badge.textContent);
    }

    const indirectMessages = document.querySelectorAll(
      '[class*=channel-anchor][class*=ts-unread-channel]',
    ).length;

    Ferdium.setBadge(messages, indirectMessages);
  };

  window.addEventListener('beforeunload', async () => {
    Ferdium.releaseServiceWorkers();
  });

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
  Ferdium.injectJSUnsafe(_path.default.join(__dirname, 'webview-unsafe.js'));
};
