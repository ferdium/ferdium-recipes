function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  // if the user is on gmail's landing page, go to the login page.
  if (
    location.hostname === 'www.google.com' &&
    location.href.includes('gmail/about/')
  ) {
    location.href =
      'https://accounts.google.com/AccountChooser?service=mail&continue=https://mail.google.com/mail/';
  }

  const getMessages = () => {
    let countImportant = 0;
    let countNonImportant = 0;
    const inboxLinks = document.querySelectorAll('.J-Ke.n0');
    const spaceAndChatBadges = document.querySelectorAll(
      'div.Xa.bSyoAf span.XU',
    );

    if (inboxLinks.length > 0) {
      const { parentNode } = inboxLinks[0];
      if (parentNode) {
        const parentNodeOfParentNode = parentNode.parentNode;
        if (parentNodeOfParentNode) {
          const unreadCounts = parentNodeOfParentNode.querySelectorAll('.bsU');
          if (unreadCounts.length > 0) {
            const unreadCount = unreadCounts[0].textContent;
            if (unreadCount.includes(':')) {
              const counts = unreadCount
                .split(':')
                .map(s => Ferdium.safeParseInt(s.replaceAll(/[^\p{N}]/gu, '')));
              countImportant = counts[0];
              countNonImportant = counts[1] - counts[0];
            } else {
              countImportant = Ferdium.safeParseInt(
                unreadCount.replaceAll(/[^\p{N}]/gu, ''),
              );
            }
          }
        }
      }
    }

    if (spaceAndChatBadges.length > 0) {
      const arr = [...spaceAndChatBadges];
      const spaceAndChatCount = arr.reduce(
        (acc, e) => Ferdium.safeParseInt(e.getInnerHTML()) + acc,
        0,
      );
      countImportant += spaceAndChatCount;
    }

    Ferdium.setBadge(countImportant, countNonImportant);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
