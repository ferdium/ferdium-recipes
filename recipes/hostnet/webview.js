module.exports = Ferdi => {
  const getMessages = () => {
    Ferdi.setBadge(parseInt(document.getElementsByClassName('badge topbar-launcherbadge')[0].firstChild.data));
  };

  Ferdi.loop(getMessages);
};