module.exports = (Ferdi) => {
  const getMessages = () => {
    const notificationBadge = document.querySelector(
      ".siteHeader__topLevelItem--profileIcon .headerPersonalNav .modalTrigger .headerPersonalNav__icon .headerPersonalNav__flag"
    );
    let notification = notificationBadge
      ? Ferdi.safeParseInt(notificationBadge.textContent)
      : 0;

    Ferdi.setBadge(notification);
  };
  Ferdi.loop(getMessages);
};
