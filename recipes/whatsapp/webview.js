function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

const { ipcRenderer } = require('electron');

function openChat(title) {
  const tryOpen = (attempt = 0) => {
    let target = null;
    const spans = document.querySelectorAll('#pane-side span[title]');
    for (const span of spans) {
      const t = span.getAttribute('title');
      if (
        t === title ||
        (t && title && (t.includes(title) || title.includes(t)))
      ) {
        target = span;
        break;
      }
    }

    if (!target) {
      const firstRow = document.querySelector(
        '#pane-side div[role="listitem"], #pane-side div[role="row"]',
      );
      if (firstRow) target = firstRow;
    }

    if (target) {
      const clickEl =
        target.closest('div[role="listitem"]') ||
        target.closest('div[role="row"]') ||
        target;
      clickEl.scrollIntoView?.({ block: 'nearest' });
      const opts = {
        bubbles: true,
        cancelable: true,
        view: window,
        buttons: 1,
        button: 0,
      };
      for (const evt of ['mousedown', 'mouseup', 'click'])
        target.dispatchEvent(new MouseEvent(evt, opts));
      if (clickEl !== target) {
        for (const evt of ['mousedown', 'mouseup', 'click'])
          clickEl.dispatchEvent(new MouseEvent(evt, opts));
      }
    } else if (attempt < 10) {
      setTimeout(() => tryOpen(attempt + 1), 200);
    }
  };

  setTimeout(() => tryOpen(0), 100);
}
module.exports = Ferdium => {
  let dbCache;

  const getMessages = () => {
    if (dbCache) {
      let unreadCount = 0;
      let unreadMutedCount = 0;

      const txn = dbCache.transaction('chat', 'readonly');
      const store = txn.objectStore('chat');
      const query = store.getAll();
      query.onsuccess = event => {
        for (const chat of event.target.result) {
          if (chat.unreadCount > 0 && !chat.archive) {
            if (chat.muteExpiration != 0 || chat.isAutoMuted) {
              unreadMutedCount += chat.unreadCount;
            } else {
              unreadCount += chat.unreadCount;
            }
          }
        }

        Ferdium.setBadge(unreadCount, unreadMutedCount);
      };

      query.addEventListener('error', event => {
        console.error('Loading data from database failed:', event);
      });
    } else {
      const dbsPromise = indexedDB.databases();
      dbsPromise.then(databases => {
        for (let index in databases) {
          //Wait for model-storage db to be available before calling indexedDB.open(). This is to make sure whatsapp created the model-storage DB
          if (databases[index].name === 'model-storage') {
            const request = window.indexedDB.open('model-storage');
            request.onsuccess = () => {
              dbCache = request.result;
              // This will be called when db.delete is triggered, we need to close and set dbCache to null to trigger lookup again
              dbCache.onversionchange = () => {
                dbCache.close();
                dbCache = null;
              };
            };
            request.addEventListener('error', () => {
              console.error('Opening model-storage database failed:', event);
            });
          }
        }
      });
    }
  };

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

  Ferdium.handleDarkMode(isEnabled => {
    if (isEnabled) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  });

  Ferdium.loop(loopFunc);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  Ferdium.onNotify(notification => {
    const { title, notificationId } = notification;

    ipcRenderer.once(`notification-onclick:${notificationId}`, () => {
      openChat(title);
    });

    return notification;
  });
};
