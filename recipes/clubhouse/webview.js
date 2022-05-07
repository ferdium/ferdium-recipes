module.exports = (Ferdium) => {
  const getMessages = () => {
    const hasNotifications = document.querySelector('#notifications-link .badge').classList.contains('visible');
    Ferdium.setBadge(0, hasNotifications ? 1 : 0);
  }

  Ferdium.loop(getMessages);
};
