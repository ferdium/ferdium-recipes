module.exports = Ferdium => {
  const getMessages = () => {
    const direct = document.querySelector(
      '#header-menu-notifications, .notifications'
    ).querySelectorAll(
      '.notification-container .notification-wrapper .notification'
    ).length;

    Ferdium.setBadge(direct);
  };

  Ferdium.loop(getMessages);
};
