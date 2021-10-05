module.exports = Ferdi => {
  const notificationsSelector = document.querySelector(
    '[class*=header_] [class*=content_] [class*=actions_] [class*=notificationsButton_]',
  );

  const getMessages = () => {
    if (notificationsSelector) {
      Ferdi.setBadge(notificationsSelector.textContent);
    }
  };

  Ferdi.loop(getMessages);
};
