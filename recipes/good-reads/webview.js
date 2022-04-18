module.exports = (Ferdium) => {
  const getMessages = () => {
    const notificationBadge = document.querySelector(
      ".siteHeader__topLevelItem--profileIcon .headerPersonalNav .modalTrigger .headerPersonalNav__icon .headerPersonalNav__flag"
    );
    let notification = notificationBadge
      ? Ferdium.safeParseInt(notificationBadge.textContent)
      : 0;

    Ferdium.setBadge(notification);
  };
  Ferdium.loop(getMessages);
};
