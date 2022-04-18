module.exports = Ferdium => {
  const getMessages = () => {
    const getNotificationButton = document.querySelector(
      '#notifications_button',
    );
    let hasNotification = getNotificationButton.classList.contains('pp-active');
    Ferdium.setBadge(0, hasNotification ? 1 : 0);
  };
  Ferdium.loop(getMessages);
};
