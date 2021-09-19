module.exports = Ferdi => {
  const getInnerInt = selector => {
    const element = document.querySelector(selector);
    return element && Ferdi.safeParseInt(element.innerText);
  };

  const getMessages = () => {
    const direct = (
      getInnerInt("header div[data-role='unread-notification-count']") ||
      getInnerInt('a.has-notifs div.notif-count') ||
      0
    );

    Ferdi.setBadge(direct);
  };

  Ferdi.loop(getMessages);
};
