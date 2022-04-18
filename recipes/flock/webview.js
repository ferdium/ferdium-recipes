module.exports = Ferdium => {
  const getMessages = () => {
    const allMessages = Ferdium.safeParseInt(document.querySelector('.team-counter').textContent);
    Ferdium.setBadge(allMessages);
  };
  Ferdium.loop(getMessages);
};
