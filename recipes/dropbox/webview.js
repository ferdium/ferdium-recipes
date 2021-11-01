module.exports = (Ferdi) => {
  const getMessages = () => {
    const hasNotifications = document.querySelector(".dig-NotificationBadge");

    Ferdi.setBadge(0, hasNotifications ? 1 : 0);
  };
  Ferdi.loop(getMessages);
};
