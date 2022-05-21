module.exports = Ferdium => {
  const getMessages = () => {
    const directCountElement = document.querySelector('.notification_count',);
    let directCount = 0;
    if (directCountElement) {
      directCount = Ferdium.safeParseInt(directCountElement.textContent);
    }

    Ferdium.setBadge(directCount, 0);
  };

  Ferdium.loop(getMessages);
};
