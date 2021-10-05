module.exports = Ferdi => {
  function getUnreadConversations() {
    Ferdi.setBadge(document.querySelector('#unread-conversations').textContent);
  }

  Ferdi.loop(getUnreadConversations);
};
