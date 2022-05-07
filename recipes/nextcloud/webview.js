module.exports = Ferdium => {
  const getMessages = () => {
    const direct = document.querySelectorAll(
      '.notifications .notification-container .notification-wrapper li .notification',
    ).length;

    Ferdium.setBadge(direct);
  };

  Ferdium.loop(getMessages);
};
