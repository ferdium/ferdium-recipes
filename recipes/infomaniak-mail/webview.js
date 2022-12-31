module.exports = Ferdium => {
  const getMessages = () => {
    // This selects the first folder (the inbox and reads its unread messages count)
    const inboxField = document.querySelector('.ws-tree-node-content')
    const inboxCountField = inboxField.querySelector('.ws-tree-node-badge');
    const inboxCountText = inboxCountField ? inboxCountField.textContent : null;
    const inboxCount = inboxCountField && inboxCountText ? Number(inboxCountText) : 0;
    
    const importantBadge = inboxCount;
    let unimportantBadge = 0;
    
    if (inboxCount == 0){
      // This selects the first folder with an unread message count.
      // The actaul count and the total of all other folders is not needed as the badge has no number.
      const totalCountField = document.querySelector('.ws-tree-node-badge');
      const totalCountText = totalCountField ? totalCountField.textContent : null;
      const totalCount = totalCountField && totalCountText ? Number(totalCountText) : 0;
      
      unimportantBadge = totalCount;
    }

    Ferdium.setBadge(importantBadge, unimportantBadge);
  };

  Ferdium.loop(getMessages);
};
