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

  // class corresponding to the bold text that is visible for room messages
  const indirectMessageSelector = 'div.V6.CL.V2.X9.Y2 span.akt span.XU';

  const getMessages = () => {
    // get unread direct messages
    let directCount;
    let indirectCount;

    // get unread messages count
    directCount = document.querySelectorAll(
      'link[href^="https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon_chat_new_notif_"][href$=".ico"]',
    ).length;

    // get unread indirect messages
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
