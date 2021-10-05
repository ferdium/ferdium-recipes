module.exports = Ferdi => {
  const getMessages = () => {
    const notificationBadge = document.querySelectorAll('.tab-red-dot').length;
    Ferdi.setBadge(notificationBadge);
  };

  Ferdi.loop(getMessages);
};
