const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
  
    // first find the css selector for the unread count text
    var unreadSelector;
    [...document.styleSheets].every(sheet => {
      const matchedRule = [...sheet.cssRules].find(
          rule => (
            rule.constructor.name === "CSSStyleRule" && 
            rule.style['color'] === 'var(--unread-marker-text)'
          )
      );
      return (unreadSelector = matchedRule !== undefined ? matchedRule.selectorText : '') === '';
    });

    let count = 0;
    let indirectCount = 0;

    for (const unreadElem of document.querySelectorAll(unreadSelector)) {
        const countValue = Ferdium.safeParseInt(unreadElem.textContent);
        if (
          !unreadElem.parentNode.previousSibling ||
          unreadElem.parentNode.previousSibling.querySelector(
            '[data-icon=muted]'
          ) === null
        ) {
          count += countValue;
        } else {
          indirectCount += countValue;
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
