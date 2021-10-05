module.exports = Ferdi => {
  const getMessages = () => {
    const directCountElement = document.querySelector(
      '.filter-list.js-notification-inboxes .count',
    );
    let directCount = 0;
    if (directCountElement) {
      directCount = Ferdi.safeParseInt(directCountElement.textContent);
    }

    const indirectCountElement = document.querySelector(
      '[class*="mail-status unread"]',
    );
    let indirectCount = 0;
    if (indirectCountElement) {
      indirectCount = 1;
    }

    Ferdi.setBadge(directCount, indirectCount);
  };

  Ferdi.loop(getMessages);
};
