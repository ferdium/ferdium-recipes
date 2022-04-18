module.exports = (Ferdium) => {
  const getMessages = () => {
    const hasNotifications = document.querySelector(".dig-NotificationBadge");

    Ferdium.setBadge(0, hasNotifications ? 1 : 0);
  };
  Ferdium.loop(getMessages);
};
