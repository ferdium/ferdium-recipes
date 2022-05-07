module.exports = (Ferdium) => {
  const getMessages = () => {
    const notifications = document.querySelectorAll("circle");

    Ferdium.setBadge(0, notifications.length > 0 ? 1 : 0);
  };
  Ferdium.loop(getMessages);
};
