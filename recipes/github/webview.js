module.exports = Ferdium => {
  const getMessages = () => {
    const directCountElement = document.querySelector(
      '.filter-list.js-notification-inboxes .count',
    );
    let directCount = 0;
    if (directCountElement) {
      directCount = Ferdium.safeParseInt(directCountElement.textContent);
    }

    const indirectCountElement = document.querySelector(
      '[class*="mail-status unread"]',
    );
    let indirectCount = 0;
    if (indirectCountElement && indirectCountElement.textContent.trim().length > 0) {
      indirectCount = 1;
    }

    Ferdium.setBadge(directCount, indirectCount);
  };

  Ferdium.loop(getMessages);
};
