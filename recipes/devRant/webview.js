const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

setTimeout(() => {
  const elem = document.querySelector('.landing-title.version-title');
  if (elem && elem.innerText.toLowerCase().includes('google chrome')) {
    window.location.reload();
  }
}, 1000);

window.addEventListener('beforeunload', async () => {
  Ferdi.clearStorageData(['appcache', 'serviceworkers', 'cachestorage', 'websql', 'indexdb']);
  Ferdi.releaseServiceWorkers();
});

module.exports = (Ferdi) => {
  const getMessages = function getMessages() {
    const elements = document.querySelectorAll('.CxUIE, .unread, ._0LqQ');
    let count = 0;
    for (let i = 0; i < elements.length; i += 1) {
      if (elements[i].querySelectorAll('.P6z4j').length === 1 && elements[i].querySelectorAll('*[data-icon="muted"]').length === 0) {
        count += 1;
      }
    }

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
