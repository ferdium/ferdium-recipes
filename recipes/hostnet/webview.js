module.exports = Ferdium => {
  const getMessages = () => {
    Ferdium.setBadge(Ferdium.safeParseInt(document.querySelectorAll('.badge.topbar-launcherbadge')[0].firstChild.data));
  };

  Ferdium.loop(getMessages);
};
