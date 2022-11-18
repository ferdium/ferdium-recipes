const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

module.exports = Ferdium => {
  let getMessages = () => {
    /* stub until db is connected*/
  }

  const request = window.indexedDB.open("model-storage");
  request.onsuccess = () => {
    const db = request.result;

    getMessages = () => {
      let unreadCount = 0;
      let unreadMutedCount = 0;

      const txn = db.transaction('chat', 'readonly');
      const store = txn.objectStore('chat');

      const query = store.getAll();

      query.onsuccess = (event) => {
        console.log(event)
        for (const chat of event.target.result) {
          if (chat.unreadCount > 0) {
            if (chat.muteExpiration > 0) {
              unreadMutedCount += chat.unreadCount;
            } else {
              unreadCount += chat.unreadCount;
            }
          }
        }

        Ferdium.setBadge(unreadCount, unreadMutedCount);
      };

      query.onerror = (event) => {
        console.error("Loading data from database failed: ", event);
      }
    }
  };

  request.onerror = (event) => {
    console.error("Opening model-storage database failed: ", event);
  }

  // inject webview hacking script
  Ferdium.injectJSUnsafe(_path.default.join(__dirname, 'webview-unsafe.js'));

  const getActiveDialogTitle = () => {
    const element = document.querySelector('header .emoji-texttt');

    Ferdium.setDialogTitle(element ? element.textContent : '');
  };

  const loopFunc = () => {
    getMessages();
    getActiveDialogTitle();
  };

  window.addEventListener('beforeunload', async () => {
    Ferdium.releaseServiceWorkers();
  });

  Ferdium.handleDarkMode((isEnabled) => {

    if (isEnabled) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

  });

  Ferdium.loop(loopFunc);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
