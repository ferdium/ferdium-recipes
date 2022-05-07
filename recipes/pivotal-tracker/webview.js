module.exports = Ferdium => {
  const getMessages = () => {
    const bell = document.querySelectorAll('#view65 > span')[0];
    if (bell) {
      Ferdium.setBadge(bell.textContent);
    }
  };

  Ferdium.loop(getMessages);
};
