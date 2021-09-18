const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

setTimeout(() => {
  if (document.querySelector('body').innerHTML.includes('Google Chrome 36+')) {
    window.location.reload();
  }
}, 1000);

module.exports = Ferdi => {
  const getMessages = function getMessages() {
    const elements = document.querySelectorAll('.CxUIE, .unread');
    let count = 0;

    for (let i = 0; i < elements.length; i += 1) {
      if (elements[i].querySelectorAll('*[data-icon="muted"]').length === 0) {
        count += 1;
      }
    }

    Ferdi.setBadge(count);
  };

  window.addEventListener('beforeunload', async () => {
    Ferdi.clearStorageData(['appcache', 'serviceworkers', 'cachestorage', 'websql', 'indexdb']);
    Ferdi.releaseServiceWorkers();
  });

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
