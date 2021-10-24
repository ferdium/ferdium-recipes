const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdi => {
  const telegramVersion = document
    .querySelector('meta[name="application-name"]')
    ?.getAttribute('content');

  const isWebZ = telegramVersion?.includes('WebZ');
  const isWebK = telegramVersion?.includes('WebK');

  // There are two different Telegram versions for internal competition
  // Read more: https://bugs.telegram.org/c/4002/public
  const webZCount = () => {
    let directCount = 0;
    let groupCount = 0;

    const directCountSelector = document.querySelectorAll(
      '.chat-list .ListItem.private .Badge.unread:not(.muted)',
    );
    const groupCountSelector = document.querySelectorAll(
      '.chat-list .ListItem.group .Badge.unread:not(.muted)',
    );

    for (const badge of directCountSelector) {
      directCount += Ferdi.safeParseInt(badge.textContent);
    }

    for (const badge of groupCountSelector) {
      groupCount += Ferdi.safeParseInt(badge.textContent);
    }

    Ferdi.setBadge(directCount, groupCount);
  };

  const webKCount = () => {
    let directCount = 0;
    let groupCount = 0;

    const elements = document.querySelectorAll('.rp:not(.is-muted)');

    for (const element of elements) {
      const subtitleBadge = element.querySelector('.dialog-subtitle-badge');

      if (subtitleBadge) {
        const parsedValue = Ferdi.safeParseInt(subtitleBadge.textContent);

        if (element.dataset.peerId > 0) {
          directCount += parsedValue;
        } else {
          groupCount += parsedValue;
        }
      }
    }

    Ferdi.setBadge(directCount, groupCount);
  };

  const getMessages = () => {
    if (isWebZ) {
      webZCount();
    } else if (isWebK) {
      webKCount();
    }
  };

  const getActiveDialogTitle = () => {
    let element;

    if (isWebZ) {
      element = document.querySelector('.chat-list .ListItem .title > h3');
    } else if (isWebK) {
      element = document.querySelector('.top .peer-title');
    }

    Ferdi.setDialogTitle(element ? element.textContent : '');
  };

  const loopFunc = () => {
    getMessages();
    getActiveDialogTitle();
  };

  Ferdi.loop(loopFunc);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
