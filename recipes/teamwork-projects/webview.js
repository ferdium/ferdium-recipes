module.exports = Ferdi => {
  const getMessages = () => {
    let indirectCount = 0;
    const badge = document.querySelector('#numNotifs2');

    if (badge && badge.textContent) {
      indirectCount = Ferdi.safeParseInt(badge.textContent);
    }

    Ferdi.setBadge(0, indirectCount);
  };

  Ferdi.loop(getMessages);
};
