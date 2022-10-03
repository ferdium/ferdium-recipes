module.exports = Ferdium => {
  function getMessages() {
    // Number of messages from rooms which has "All Messages" notifications enabled or when mentionned in a room with "Mentions & Keyword" notifications level.
    let directCount = 0;
    // Number of messages for rooms which has "Mentions & Keyword" notifications level set which does not directly mention you.
    let indirectCount = 0;

    // Retrieves notification badges
    const badges = document.querySelectorAll('.sidebar .notification-badge');
    for (const badge of badges) {
      if (badge.childNodes.length === 0) {
        indirectCount++;
      } else {
        directCount += Ferdium.safeParseInt(badge.childNodes[0].textContent);
      }
    }

    // Set Ferdium badge
    Ferdium.setBadge(directCount, indirectCount);
  }
  Ferdium.loop(getMessages);
};
