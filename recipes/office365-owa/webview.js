module.exports = Ferdi => {
  const getMessages = () => {
    let directUnreadCount = 0;
    let indirectUnreadCount = 0;

    if (location.pathname.match(/\/owa/)) {
      // classic app
      directUnreadCount = Ferdi.safeParseInt(jQuery("span[title*='Inbox'] + div > span").first().text());
    } else {
      // new app
      const foldersElement = document.querySelector('div[role=tree]:nth-child(3)');
      if (foldersElement) {
        const allScreenReaders = foldersElement.querySelectorAll('span.screenReaderOnly');
        for (const child of allScreenReaders) {
          if (child.previousSibling) {
            directUnreadCount += Ferdi.safeParseInt(child.previousSibling.innerText);
          }
        }
      }

      const groupsElement = document.querySelector('div[role=tree]:nth-child(4)');
      if (groupsElement) {
        const allScreenReaders = groupsElement.querySelectorAll('span.screenReaderOnly');
        for (const child of allScreenReaders) {
          if (child.previousSibling) {
            indirectUnreadCount += Ferdi.safeParseInt(child.previousSibling.innerText);
          }
        }
      }
    }

    Ferdi.setBadge(directUnreadCount, indirectUnreadCount);
  }

  Ferdi.loop(getMessages);
};
