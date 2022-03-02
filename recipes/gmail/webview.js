const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdi => {
  // if the user is on gmail's landing page, go to the login page.
  if (
    location.hostname == 'www.google.com' &&
    location.href.includes('gmail/about/')
  ) {
    location.href =
      'https://accounts.google.com/AccountChooser?service=mail&continue=https://mail.google.com/mail/';
  }

  const getMessages = () => {
    let count = 0;

    const inboxLinks = document.querySelectorAll('.J-Ke.n0');
    if (inboxLinks.length > 0) {
      let parentNode = inboxLinks[0].parentNode;
      if (parentNode) {
        let parentNodeOfParentNode = parentNode.parentNode;
        if (parentNodeOfParentNode) {
          const unreadCounts = parentNodeOfParentNode.querySelectorAll('.bsU');
          if (unreadCounts.length > 0) {
            count = Ferdi.safeParseInt(unreadCounts[0].textContent.replace(/[^\p{N}]/gu, ''));
          }
        }
      }
    }

    // set Ferdi badge
    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
