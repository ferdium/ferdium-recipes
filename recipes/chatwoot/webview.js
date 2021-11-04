module.exports = (Ferdi) => {
  const getMessages = function getMessages() {
    const unreadBadges = document.querySelectorAll("span.unread");
    const unreadBadgesArray = [...unreadBadges];
    const unreadMessagesCount = unreadBadgesArray.reduce(
      (previousValue, currentBadge) =>
        previousValue + Ferdi.safeParseInt(currentBadge.textContent),
      0,
    );
    Ferdi.setBadge(unreadMessagesCount);
  };

  Ferdi.loop(getMessages);
};
