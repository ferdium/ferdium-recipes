module.exports = Ferdium => {
  const getMessages = () => {
    const notifications = document.querySelectorAll('.notification--number');
    Ferdium.setBadge(0, notifications.length > 0 ? 1 : 0);
  };

  Ferdium.loop(getMessages);
};
