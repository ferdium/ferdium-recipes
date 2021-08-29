module.exports = Ferdi => {
  function getMessages() {
    let directUnreadCount = 0;
    let indirectUnreadCount = 0;

    if (location.pathname.match(/\/owa/)) {
      // classic app
      directUnreadCount = parseInt(
        jQuery("span[title*='Inbox'] + div > span")
          .first()
          .text(),
        10,
      );
    } else {
      // new app
      const foldersElement = document.querySelector('div[role=tree]:nth-child(3)');
      if (foldersElement) {
        const allScreenReaders = foldersElement.querySelectorAll('span.screenReaderOnly');
        for (const child of allScreenReaders) {
          if ((child.innerText === 'unread' || child.innerText === 'item') && child.previousSibling) {
            directUnreadCount += parseInt(child.previousSibling.innerText, 10);
          }
        }
      }

      const groupsElement = document.querySelector('div[role=tree]:nth-child(4)');
      if (groupsElement) {
        const allScreenReaders = groupsElement.querySelectorAll('span.screenReaderOnly');
        for (const child of allScreenReaders) {
          if ((child.innerText === 'unread' || child.innerText === 'item') && child.previousSibling) {
            indirectUnreadCount += parseInt(child.previousSibling.innerText, 10);
          }
        }
      }
    }

    Ferdi.setBadge(directUnreadCount, indirectUnreadCount);
  }

  Ferdi.loop(getMessages);
};
