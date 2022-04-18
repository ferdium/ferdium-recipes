module.exports = Ferdium => {
  const getMessages = () => {
    const count = document.querySelectorAll('.unseen-msg-count').length;
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
