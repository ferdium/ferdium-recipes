module.exports = Ferdium => {
  const getMessages = () => {
    Ferdium.setBadge(Number.parseInt(document.querySelectorAll('.badge.topbar-launcherbadge')[0].firstChild.data));
  };

  Ferdium.loop(getMessages);
};
