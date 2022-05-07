module.exports = Ferdium => {
  const getMessages = () => {
    // get unread messages
    const element = document.querySelector(
      '#atlassian-navigation-notification-count span',
    );
    Ferdium.setBadge(element ? element.textContent : 0);
  };

  Ferdium.loop(getMessages);
};
