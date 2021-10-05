module.exports = Ferdi => {
  const getMessages = () => {
    let unread = 0;
    const notificationBadge = document.querySelectorAll(
      '.notification-badge',
    )[0];
    if (notificationBadge != undefined) {
      unread = Ferdi.safeParseInt(notificationBadge.textContent);
    }
    Ferdi.setBadge(unread);
  };

  Ferdi.loop(getMessages);
};
