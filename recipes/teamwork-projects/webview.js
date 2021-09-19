module.exports = (Ferdi) => {
  const getMessages = () => {
    let indirectCount = 0;
    const badge = document.getElementById('numNotifs2');

    if (badge && badge.innerText) {
      indirectCount = Ferdi.safeParseInt(badge.innerText);
    }

    Ferdi.setBadge(0, indirectCount);
  }

  Ferdi.loop(getMessages);
};
