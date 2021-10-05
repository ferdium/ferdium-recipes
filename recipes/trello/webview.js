module.exports = Ferdi => {
  const getMessages = () => {
    const notifications = document.querySelectorAll('[class*=_3W-zkl4-bnVKzJ]');
    Ferdi.setBadge(0, notifications.length > 0 ? 1 : 0);
  };

  Ferdi.loop(getMessages);
};
