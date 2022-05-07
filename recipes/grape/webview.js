module.exports = Ferdium => {
  const getMessages = () => {
    const directMessages = document.querySelectorAll('.c0120').length;
    const indirectMessages = document.querySelectorAll('.c0121').length;

    Ferdium.setBadge(directMessages, indirectMessages);
  };

  Ferdium.loop(getMessages);
};
