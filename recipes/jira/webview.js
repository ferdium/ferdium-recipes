module.exports = Ferdi => {
  const getMessages = () => {
    // get unread messages
    const element = document.querySelector(
      '#atlassian-navigation-notification-count span',
    );
    Ferdi.setBadge(element ? element.textContent : 0);
  };

  Ferdi.loop(getMessages);
};
