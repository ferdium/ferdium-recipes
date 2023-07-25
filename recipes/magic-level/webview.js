function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let countImportant = 0;
    let countNonImportant = 0;
    const inboxLinks = document.querySelectorAll('.J-Ke.n0');
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
    Ferdium.setBadge(countImportant, countNonImportant);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
