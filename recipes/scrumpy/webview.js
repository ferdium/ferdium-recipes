module.exports = Ferdi => {
  const getMessages = () => {
    const notifications = document.querySelector(
      '.c-notifications-dropdown__count',
    );
    if (notifications) {
      Ferdi.setBadge(notifications.textContent);
    }
  };

  Ferdi.loop(getMessages);
};
