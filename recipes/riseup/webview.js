module.exports = Ferdi => {
  const getMessages = () => {
    let unread = 0;
    const notificationBadge = document.getElementsByClassName('unreadcount')[0];
    if (notificationBadge != undefined) {
      unread = Ferdi.safeParseInt(notificationBadge.innerText);
    }
    Ferdi.setBadge(unread);
  };

  Ferdi.loop(getMessages);
};
