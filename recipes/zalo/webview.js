module.exports = Ferdi => {
  const getMessages = () => {
    const notificationBadge = document.getElementsByClassName('tab-red-dot').length;
    Ferdi.setBadge(notificationBadge);
  };

  Ferdi.loop(getMessages);
};
