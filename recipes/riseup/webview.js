module.exports = Ferdium => {
  const getMessages = () => {
    let unread = 0;
    const notificationBadge = document.querySelectorAll('.unreadcount')[0];
    if (notificationBadge != undefined) {
      unread = Ferdium.safeParseInt(notificationBadge.textContent);
    }
    Ferdium.setBadge(unread);
  };

  Ferdium.loop(getMessages);
};
