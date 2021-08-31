module.exports = (Ferdi) => {
  const getMessages = function getMessages() {
    // get unread messages
    const element = document.querySelector('#atlassian-navigation-notification-count span');
    Ferdi.setBadge(element ? element.innerText : 0);
  };

  Ferdi.loop(getMessages);
};
