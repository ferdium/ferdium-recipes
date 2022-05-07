const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

setTimeout(() => {
  if (
    document.querySelector('body').textContent.includes('Google Chrome 36+')
  ) {
    window.location.reload();
  }
}, 1000);

module.exports = (Ferdium, settings) => {
  const getMessages = () => {
    const elements = document.querySelectorAll('.CxUIE, .unread');
    let count = 0;

    for (const element of elements) {
      if (element.querySelectorAll('*[data-icon="muted"]').length === 0) {
        count += 1;
      }
    }

    Ferdium.setBadge(count);
  };

  window.addEventListener('beforeunload', async () => {
    Ferdium.clearStorageData(settings.id, {
      storages: [
        'appcache',
        'serviceworkers',
        'cachestorage',
        'websql',
        'indexdb',
      ],
    });
    Ferdium.releaseServiceWorkers();
  });

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
