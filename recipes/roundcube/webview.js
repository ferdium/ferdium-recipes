module.exports = Ferdi => {
  const getMessages = () => {
    const directElements = document.querySelectorAll('.unreadcount');
    let direct = 0;
    for (const directElement of directElements) {
      direct += Ferdi.safeParseInt(directElement.textContent);
    }
    Ferdi.setBadge(direct);
  };

  Ferdi.loop(getMessages);
};
