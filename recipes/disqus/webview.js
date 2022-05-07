module.exports = Ferdium => {
  const getInnerInt = selector => {
    const element = document.querySelector(selector);
    return element && Ferdium.safeParseInt(element.textContent);
  };

  const getMessages = () => {
    const direct =
      getInnerInt("header div[data-role='unread-notification-count']") ||
      getInnerInt('a.has-notifs div.notif-count') ||
      0;

    Ferdium.setBadge(direct);
  };

  Ferdium.loop(getMessages);
};
