const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function createElement(messageBody, idString) {
  const messageText = document.createTextNode(messageBody);
  const message = document.createElement("p");
  message?.setAttribute("id", idString);
  message?.setAttribute("class", idString);
  message?.appendChild(messageText);

  return message;
}

function addThemeMessage() {
  const idString = 'ferdium-theme-message';
  const idStringTitle = 'ferdium-theme-title';
  const elementExists = document.querySelectorAll(`.${idString}`)[0] || document.querySelectorAll(`.${idStringTitle}`)[0] ? true : false;

  if (!elementExists) {
    const themePopupDiv = document.querySelectorAll("._2Nr6U")[0];

    // Create Ferdium Warning title element
    const messageTitleString = 'FERDIUM WARNING!';
    const messageTitleElement = createElement(messageTitleString, idStringTitle);

    // Create Ferdium Waring message element
    const messageBody1 = 'To change your Whatsapp Theme, please use the native settings on Ferdium.';
    const messageBody2 = 'For that, right-click on the Whatsapp Service and click on Enable/Disable Dark mode.';
    const message1 = createElement(messageBody1, idString);
    const message2 = createElement(messageBody2, idString);

    // Add messages to Whatsapp Window
    themePopupDiv?.prepend(message2)
    themePopupDiv?.prepend(message1)
    themePopupDiv?.prepend(messageTitleElement)

    // Hide OK Button.
    document.querySelectorAll("._20C5O")[1]?.setAttribute('style', 'display: none;');
    document.querySelectorAll("._2Nr6U > form")[0]?.setAttribute('style', 'display: none;');
  }
}

module.exports = Ferdium => {
  const getMessages = () => {
    let count = 0;
    let indirectCount = 0;

    const parentChatElem = [
      ...document.querySelectorAll('div[aria-label]'),
    ].sort((a, b) => (a.offsetHeight < b.offsetHeight ? 1 : -1))[0];
    if (!parentChatElem) {
      return;
    }

    const unreadSpans = parentChatElem.querySelectorAll('span[aria-label]');
    for (const unreadElem of unreadSpans) {
      const countValue = Ferdium.safeParseInt(unreadElem.textContent);
      if (countValue > 0) {
        if (
          !unreadElem.parentNode.previousSibling ||
          unreadElem.parentNode.previousSibling.querySelectorAll(
            '[data-icon=muted]',
          ).length === 0
        ) {
          count += countValue;
        } else {
          indirectCount += countValue;
        }
      }
    }

    Ferdium.setBadge(count, indirectCount);
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
    addThemeMessage();
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
