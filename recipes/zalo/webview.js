module.exports = Ferdium => {
  const getMessages = () => {
    const notificationBadge = document.querySelectorAll('.tab-red-dot').length;
    Ferdium.setBadge(notificationBadge);
  };

  Ferdium.loop(getMessages);
};
