const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

  Ferdium.loop(loopFunc);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
