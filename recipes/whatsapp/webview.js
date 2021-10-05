const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (Ferdi, settings) => {
  const getMessages = () => {
    let count = 0;
    let indirectCount = 0;

    const parentChatElem = [...document.querySelectorAll('div[aria-label]')]
                           .sort((a, b) => (a.offsetHeight < b.offsetHeight) ? 1 : -1)[0];
    if (!parentChatElem) {
      return;
    }

    const unreadSpans = parentChatElem.querySelectorAll('span[aria-label]');
    for (const unreadElem of unreadSpans) {
      const countValue = Ferdi.safeParseInt(unreadElem.textContent);
      if (countValue > 0) {
        if (!unreadElem.parentNode.previousSibling || unreadElem.parentNode.previousSibling.querySelectorAll('[data-icon=muted]').length === 0) {
          count += countValue;
        } else {
          indirectCount += countValue;
        }
      }
    }

    Ferdi.setBadge(count, indirectCount);
  };

  window.addEventListener('beforeunload', async () => {
    Ferdi.clearStorageData(settings.id, { storages: ['appcache', 'serviceworkers', 'cachestorage', 'websql', 'indexdb'] });
    Ferdi.releaseServiceWorkers();
  });

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
