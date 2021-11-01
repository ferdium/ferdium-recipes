module.exports = Ferdi => {
  const getMessages = () => {
    const unreadMessageCountElement = document.querySelector('#notifications-anchor .badge');
    const unreadMessagesCount = Ferdi.safeParseInt(unreadMessageCountElement.textContent);
    Ferdi.setBadge(unreadMessagesCount, 0);
  };
  Ferdi.loop(getMessages);
};
