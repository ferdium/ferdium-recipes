module.exports = Ferdi => {
  const getMessages = () => {
    let unreadCount = 0;
    // Loop over all displayed counters and take the highest one (from the "All Mail" folder)
    for (const counterElement of document.querySelectorAll('.navigation-counter-item')) {
      const unreadCounter = Ferdi.safeParseInt(counterElement.textContent);
      unreadCount = Math.max(unreadCount, unreadCounter);
    }

    Ferdi.setBadge(unreadCount);
  };

  Ferdi.loop(getMessages);
};
