module.exports = Ferdi => {
  const getMessages = () => {
    let unread = 0;
    const notificationBadge = document.querySelectorAll(
      '.NavSelectorItem-unread-badge',
    )[0];
    if (notificationBadge != undefined) {
      const innerBadge =
        notificationBadge.querySelectorAll('.BadgeV2-count')[0];
      unread = Ferdi.safeParseInt(innerBadge.textContent);
    }
    Ferdi.setBadge(unread);
  };

  Ferdi.loop(getMessages);
};
