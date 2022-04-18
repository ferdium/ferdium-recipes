module.exports = (Ferdium) => {
  const getMessages = () => {
    Ferdium.setBadge($('.unread').length);
  };

  Ferdium.loop(getMessages);
};
