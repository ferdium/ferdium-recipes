module.exports = Ferdium => {
  const getMessages = () => {
    let indirectCount = 0;
    const badge = document.querySelector('#numNotifs2');

    if (badge && badge.textContent) {
      indirectCount = Ferdium.safeParseInt(badge.textContent);
    }

    Ferdium.setBadge(0, indirectCount);
  };

  Ferdium.loop(getMessages);
};
