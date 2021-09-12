module.exports = Ferdi => {
  const getMessages = () => {
    const allMessages = Ferdi.safeParseInt(document.querySelector('.team-counter').textContent);
    Ferdi.setBadge(allMessages);
  };
  Ferdi.loop(getMessages);
};
