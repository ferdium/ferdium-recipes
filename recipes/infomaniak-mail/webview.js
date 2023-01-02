module.exports = Ferdium => {
  const getMessages = () => {
    // This selects the first folder (the inbox and reads its unread messages count)
    const inboxField = document.querySelector('.ws-tree-node-content')
    const inboxCountField = inboxField.querySelector('.ws-tree-node-badge');
    const inboxCountText = inboxCountField ? inboxCountField.textContent : null;
    const inboxCount = inboxCountText ? Ferdium.safeParseInt(inboxCountText) : 0;

    let unimportantCount = 0;

    if (inboxCount === 0) {
      // This selects the first folder with an unread message count.
      // The actaul count and the total of all other folders is not needed as the badge has no number.
      const totalCountField = document.querySelector('.ws-tree-node-badge');
      const totalCountText = totalCountField ? totalCountField.textContent : null;
      unimportantCount = totalCountText ? Ferdium.safeParseInt(totalCountText) : 0;
    }

    Ferdium.setBadge(inboxCount, unimportantCount);
  };

  Ferdium.loop(getMessages);
};
