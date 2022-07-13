module.exports = Ferdium => {
  const getMessages = () => {
    const directCountElement = document.querySelector(
      '.filter-list.js-notification-inboxes .count',
    );
    const directCount = directCountElement
      ? Ferdium.safeParseInt(directCountElement.textContent)
      : 0;
    const indirectCount = document.querySelector(
      '[class*="mail-status unread"]:not([hidden])',
    ) ? 1 : 0;
    Ferdium.setBadge(directCount, indirectCount);
  };

  Ferdium.loop(getMessages);
};
