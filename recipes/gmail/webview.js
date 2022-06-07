const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  // if the user is on gmail's landing page, go to the login page.
  if (
    location.hostname == 'www.google.com' &&
    location.href.includes('gmail/about/')
  ) {
    location.href =
      'https://accounts.google.com/AccountChooser?service=mail&continue=https://mail.google.com/mail/';
  }

  const getMessages = () => {
    let countImportant = 0;
    let countNonImportant = 0;
    const inboxLinks = document.querySelectorAll('.J-Ke.n0');
    if (inboxLinks.length > 0) {
      let parentNode = inboxLinks[0].parentNode;
      if (parentNode) {
        let parentNodeOfParentNode = parentNode.parentNode;
        if (parentNodeOfParentNode) {
          const unreadCounts = parentNodeOfParentNode.querySelectorAll('.bsU');
          if (unreadCounts.length > 0) {
            let unreadCount = unreadCounts[0].textContent;
            if (unreadCount.includes(':')) {
              let counts = unreadCount
                .split(':')
                .map(s => Ferdium.safeParseInt(s.replace(/[^\p{N}]/gu, '')));
              countImportant = counts[0];
              countNonImportant = counts[1] - counts[0];
            } else {
              countImportant = Ferdium.safeParseInt(
                unreadCount.replace(/[^\p{N}]/gu, ''),
              );
            }
          }
        }
      }
    }
    Ferdium.setBadge(countImportant, countNonImportant);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
