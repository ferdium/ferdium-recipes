module.exports = Ferdi => {
  const getMessages = () => {
    Ferdi.setBadge(Number.parseInt(document.querySelectorAll('.badge.topbar-launcherbadge')[0].firstChild.data));
  };

  Ferdi.loop(getMessages);
};