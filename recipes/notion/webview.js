module.exports = Ferdi => {
  const getMessages = () => {
    let direct = 0;
    const badgeDiv = document.querySelector(
      '.notion-sidebar-container > div > div > div > :nth-child(4) > :nth-child(2) > div > :nth-child(3) > div > div',
    );
    if (badgeDiv) {
      direct = Ferdi.safeParseInt(badgeDiv.textContent);
    }

    Ferdi.setBadge(direct);
  };

  Ferdi.loop(getMessages);
};
