module.exports = (Ferdium) => {
  function getNotifications() {
      let unreadNotifications = 0;
      for (const notificationCounterElement of document.querySelectorAll(
              ".notification__count"
          )) {
          unreadNotifications =
              unreadNotifications +
              Ferdium.safeParseInt(notificationCounterElement.textContent);
      }

      Ferdium.setBadge(unreadNotifications);
  }
  Ferdium.loop(getNotifications);
};
