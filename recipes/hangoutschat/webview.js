function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  // if the user is on googlechat landing page, go to the login page.
  if (
    location.hostname === 'workspace.google.com' &&
    location.href.includes('products/chat/')
  ) {
    location.href =
      'https://accounts.google.com/AccountChooser?continue=https://chat.google.com/?referrer=2';
  }

  // div definition of the text element listing the number of unread "Direct messages"
  const directMessageSelector = 'div[data-section-type="1"] div.TeR7uc';

  // div definition of the text element listing the number of unread "Spaces" messages
  const indirectMessageSelector = 'div[data-section-type="2"] div.TeR7uc';

  const getMessages = () => {
    // get unread direct messages
    let directCount;
    let indirectCount;

    // get unread direct messages count
    const directCountSelector = document.querySelector(directMessageSelector);
    if (directCountSelector) {
      directCount = Number(directCountSelector.textContent);
    }

    // get unread indirect (spaces) messages
    const indirectCountSelector = document.querySelector(
      indirectMessageSelector,
    );
    if (indirectCountSelector) {
      indirectCount = Number(indirectCountSelector.textContent);
    }

    // set Ferdium badge
    Ferdium.setBadge(directCount, indirectCount);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  document.addEventListener('click', e => {
    // @ts-expect-error
    const { tagName, target, href } = e.target;

    if (tagName === 'A' && target === '_blank') {
      e.preventDefault();
      e.stopImmediatePropagation();
      window.open(href);
    }
  });
};
