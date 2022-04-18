module.exports = Ferdium => {
  const getMessages = () => {
    const directMessages = document.querySelectorAll('.activity-indicator-mentions').length;
    const indirectMessages = document.querySelectorAll('.activity-indicator-chat').length;

    // set Ferdium badge
    Ferdium.setBadge(directMessages, indirectMessages);
  };

  Ferdium.loop(getMessages);
};
