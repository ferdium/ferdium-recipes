module.exports = Ferdium => {
  const getMessages = () => {
    let count = 0;
    const element = document.querySelector('.message-count');
    if (element) {
      count = Ferdium.safeParseInt(element.textContent);
    }
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
