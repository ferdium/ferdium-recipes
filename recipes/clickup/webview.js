module.exports = Ferdium => {
  const getMessages = () => {
    const unread = document.querySelector('.cu-notification-alert__dot');
    Ferdium.setBadge(unread ? 1 : 0);
  };

  Ferdium.loop(getMessages);
};
