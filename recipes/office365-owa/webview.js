function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = (Ferdium, settings) => {
  const collectCounts = (selector, index=0) => {
    let unreadCount = 0;
    const foldersElement = document.querySelectorAll(selector)[index];
    if (foldersElement) {
      const allScreenReaders = foldersElement.querySelectorAll(
        'div[role=treeitem] > span:last-child span.screenReaderOnly'
      );
      for (const child of allScreenReaders) {
        if (child.previousSibling) {
          unreadCount += Ferdium.safeParseInt(
            child.previousSibling.textContent,
          );
        }
      }
    }
    return unreadCount;
  };

  // adapted from the franz-custom-website recipe, for opening
  // links according to  the user's preference (Ferdium/ext.browser)
  document.addEventListener(
    'click',
    event => {
      const link = event.target.closest('a');
      const button = event.target.closest('button');

      if (link || button) {
        const url = link
          ? link.getAttribute('href')
          : button.getAttribute('title');

        // check if the URL is relative or absolute
        if (url.startsWith('/')) {
          return;
        }

        // check if we have a valid URL that is not a script nor an image:
        if (url && url !== '#' && !Ferdium.isImage(link)) {
          event.preventDefault();
          event.stopPropagation();

          if (settings.trapLinkClicks === true) {
            window.location.href = url;
          } else {
            Ferdium.openNewWindow(url);
          }
        }
      }
    },
    true,
  );

  const getMessages = () => {
    let directUnreadCount = 0;
    let indirectUnreadCount = 0;
    if (/\/owa/.test(location.pathname)) {
      // classic app
      directUnreadCount = Ferdium.safeParseInt(
        document.querySelectorAll("span[title*='Inbox'] + div > span")[0]
          ?.textContent,
      );
    } else {
      // new app
      directUnreadCount = settings.onlyShowFavoritesInUnreadCount === true
          ? collectCounts('div[role=tree] div[role=group]', 0)
          : collectCounts('div[role=tree] div[role=group]', 1);

      indirectUnreadCount = collectCounts('div[role=tree]:nth-child(4)'); // groups
    }
    Ferdium.setBadge(directUnreadCount, indirectUnreadCount);
  };
  Ferdium.loop(getMessages);
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
