module.exports = Ferdi => {
  const getMessages = () => {
    const count = document.querySelectorAll('.unseen-msg-count').length;
    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
