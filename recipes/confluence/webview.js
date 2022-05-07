module.exports = Ferdium => {
  const getMessages = () => {
    const unreadMessageCountElement = document.querySelector('#notifications-anchor .badge');
    const unreadMessagesCount = Ferdium.safeParseInt(unreadMessageCountElement.textContent);
    Ferdium.setBadge(unreadMessagesCount, 0);
  };
  Ferdium.loop(getMessages);
};
