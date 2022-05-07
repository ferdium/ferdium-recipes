module.exports = Ferdium => {
  const getMessages = () => {
    const totalNotifications = document.querySelectorAll('#notificationList > .notification').length;
    const hasUnread = document.querySelectorAll('#notificationsButton.hasUnread').length > 0;
    Ferdium.setBadge(hasUnread ? totalNotifications : 0);
  };

  Ferdium.loop(getMessages);
};
