module.exports = Ferdium => {
  function getUnreadConversations() {
    Ferdium.setBadge(document.querySelector('#unread-conversations').textContent);
  }

  Ferdium.loop(getUnreadConversations);
};
