module.exports = (Ferdium) => {
  const getMessages = () => {
    const messages = $('#jGrowl .jGrowl-notify').length;

    Ferdium.setBadge(messages - 1);
  };

  Ferdium.loop(getMessages);
};
