const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('beforeunload', async () => {
  Ferdi.clearStorageData(['appcache', 'serviceworkers', 'cachestorage', 'websql', 'indexdb']);
  Ferdi.releaseServiceWorkers();
});

module.exports = Ferdi => {
  const getMessages = () => {
    let messages = 0;
    const badge = document.querySelector('.activity-badge.dot-activity-badge .activity-badge');
    if (badge) {
      messages = Ferdi.safeParseInt(badge.innerHTML);
    }

    const indirectMessages = document.querySelectorAll('[class*=channel-anchor][class*=ts-unread-channel]').length;

    Ferdi.setBadge(messages, indirectMessages);
  };

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
  Ferdi.injectJSUnsafe(_path.default.join(__dirname, 'webview-unsafe.js'));
};
