module.exports = Ferdi => {
  const getMessages = () => {
    const direct = document.querySelectorAll(
      '.notifications .notification-container .notification-wrapper li .notification',
    ).length;

    Ferdi.setBadge(direct);
  };

  Ferdi.loop(getMessages);
};
