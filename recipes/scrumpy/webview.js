module.exports = Ferdium => {
  const getMessages = () => {
    const notifications = document.querySelector(
      '.c-notifications-dropdown__count',
    );
    if (notifications) {
      Ferdium.setBadge(notifications.textContent);
    }
  };

  Ferdium.loop(getMessages);
};
