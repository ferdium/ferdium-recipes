module.exports = Ferdium => {
  const getMessages = () => {
    const directElements = document.querySelectorAll('.unreadcount');
    let direct = 0;
    for (const directElement of directElements) {
      direct += Ferdium.safeParseInt(directElement.textContent);
    }
    Ferdium.setBadge(direct);
  };

  Ferdium.loop(getMessages);
};
