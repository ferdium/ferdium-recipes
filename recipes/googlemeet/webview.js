const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

window.addEventListener('load', () => {
  const title = document.querySelector('.window-title').textContent;

  if (title && title.includes('Google Chrome 36+')) {
    window.location.reload();
  }
});

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

  Ferdium.loop(getMessages);

  window.addEventListener('beforeunload', async () => {
    Ferdium.clearStorageData(settings.id, { storages: ['serviceworkers'] });
  });

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
