module.exports = (Ferdium) => {
  const getMessages = function getMessages() {
    const unreadBadges = document.querySelectorAll("span.unread");
    const unreadBadgesArray = [...unreadBadges];
    const unreadMessagesCount = unreadBadgesArray.reduce(
      (previousValue, currentBadge) =>
        previousValue + Ferdium.safeParseInt(currentBadge.textContent),
      0,
    );
    Ferdium.setBadge(unreadMessagesCount);
  };

  Ferdium.loop(getMessages);
};
