module.exports = Ferdi => {
  const getMessages = () => {
    const getNotificationButton = document.querySelector(
      '#notifications_button',
    );
    let hasNotification = getNotificationButton.classList.contains('pp-active');
    Ferdi.setBadge(0, hasNotification ? 1 : 0);
  };
  Ferdi.loop(getMessages);
};
