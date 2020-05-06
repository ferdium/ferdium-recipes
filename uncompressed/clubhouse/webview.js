module.exports = (Ferdi) => {
  function getMessages() {
    let unread = 0;
    const hasNotifications = document.querySelector('#notifications-link .badge').classList.contains('visible');
    if (hasNotifications) {
      Ferdi.setBadge(1);
    }
  }

  Ferdi.loop(getMessages);
}
