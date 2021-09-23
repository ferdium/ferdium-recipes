module.exports = (Ferdi, settings) => {
  const collectCounts = (selector) => {
    let unreadCount = 0;
    const foldersElement = document.querySelector(selector);
    if (foldersElement) {
      const allScreenReaders = foldersElement.querySelectorAll('span.screenReaderOnly');
      for (const child of allScreenReaders) {
        if (child.previousSibling) {
          unreadCount += Ferdi.safeParseInt(child.previousSibling.innerText);
        }
      }
    }
    return unreadCount;
  };

  const getMessages = () => {
    let directUnreadCount = 0;
    let indirectUnreadCount = 0;

    if (location.pathname.match(/\/owa/)) {
      // classic app
      directUnreadCount = Ferdi.safeParseInt(jQuery("span[title*='Inbox'] + div > span").first().text());
    } else {
      // new app
      if (settings.onlyShowFavoritesInUnreadCount === true) {
        directUnreadCount = collectCounts('div[role=tree]:nth-child(2)'); // favorites
      } else {
        directUnreadCount = collectCounts('div[role=tree]:nth-child(3)'); // folders
      }

      indirectUnreadCount = collectCounts('div[role=tree]:nth-child(4)'); // groups
    }

    Ferdi.setBadge(directUnreadCount, indirectUnreadCount);
  }

  Ferdi.loop(getMessages);
};
