module.exports = Ferdium => {
  const getMessages = () => {
    const directMessages = document.querySelectorAll('.hc-mention').length;
    const allMessages = document.querySelectorAll('.aui-badge:not(.hc-mention)').length - directMessages;

    // set Ferdium badge
    Ferdium.setBadge(directMessages, allMessages);
  };

  Ferdium.loop(getMessages);
};
