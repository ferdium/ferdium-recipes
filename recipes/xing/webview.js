module.exports = Ferdi => {
  function getUnreadConversations() {
    Ferdi.setBadge(document.querySelector('#unread-conversations').innerHTML);
  }

  Ferdi.loop(getUnreadConversations);
};
