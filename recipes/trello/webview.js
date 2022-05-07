module.exports = Ferdium => {
  const getMessages = () => {
    const notifications = document.querySelectorAll('[class*=_3W-zkl4-bnVKzJ]');
    Ferdium.setBadge(0, notifications.length > 0 ? 1 : 0);
  };

  Ferdium.loop(getMessages);
};
