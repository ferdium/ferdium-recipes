module.exports = Ferdium => {
  const notificationsSelector = document.querySelector(
    '[class*=header_] [class*=content_] [class*=actions_] [class*=notificationsButton_]',
  );

  const getMessages = () => {
    if (notificationsSelector) {
      Ferdium.setBadge(notificationsSelector.textContent);
    }
  };

  Ferdium.loop(getMessages);
};
