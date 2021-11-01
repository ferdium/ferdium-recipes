module.exports = Ferdi => {
  const getMessages = () => {
    // Count number of conversations or teams with unread messages
    const count = document.querySelectorAll('.unread-count').length;
    Ferdi.setBadge(count, 0);
  };

  Ferdi.loop(getMessages);
};
