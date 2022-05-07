module.exports = Ferdium => {
  const getMessages = () => {
    let unread = 0;
    const notificationBadge = document.querySelectorAll(
      '.NavSelectorItem-unread-badge',
    )[0];
    if (notificationBadge != undefined) {
      const innerBadge =
        notificationBadge.querySelectorAll('.BadgeV2-count')[0];
      unread = Ferdium.safeParseInt(innerBadge.textContent);
    }
    Ferdium.setBadge(unread);
  };

  Ferdium.loop(getMessages);
};
