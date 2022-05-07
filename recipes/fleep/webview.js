module.exports = Ferdium => {
  const getMessages = () => {
    // Count number of conversations or teams with unread messages
    const count = document.querySelectorAll('.unread-count').length;
    Ferdium.setBadge(count, 0);
  };

  Ferdium.loop(getMessages);
};
