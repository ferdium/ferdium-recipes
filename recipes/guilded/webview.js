module.exports = Ferdi => {
  const getMessages = () => {
    let unread = 0;
    const notificationBadge = document.getElementsByClassName('NavSelectorItem-unread-badge')[0];
    if (notificationBadge != undefined) {
      const innerBadge = notificationBadge.getElementsByClassName('BadgeV2-count')[0];
      unread = Ferdi.safeParseInt(innerBadge.innerText);
    }
    Ferdi.setBadge(unread);
  };

  Ferdi.loop(getMessages);
};
