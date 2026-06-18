module.exports = Ferdium => {
  const getMessages = () => {
    const messageBadge = document.querySelector('#mat-badge-content-0');
    const parsedCount = Ferdium.safeParseInt(messageBadge.textContent);
    if (parsedCount) {
      Ferdium.setBadge(parsedCount, 0);
    } else {
      Ferdium.setBadge(0, 0);
    }
  };
  Ferdium.loop(getMessages);
};
