module.exports = (Ferdium) => {
  const getMessages = () => {
    const mentions = document.querySelectorAll('.chat-line .mentioned').length;
    Ferdium.setBadge(mentions, 0);
  };

  Ferdium.loop(getMessages);
};
