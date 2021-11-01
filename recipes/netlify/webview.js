module.exports = (Ferdi) => {
  const getMessages = () => {
    const notifications = document.querySelectorAll("circle");

    Ferdi.setBadge(0, notifications.length > 0 ? 1 : 0);
  };
  Ferdi.loop(getMessages);
};
