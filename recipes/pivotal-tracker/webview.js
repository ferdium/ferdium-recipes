module.exports = Ferdi => {
  const getMessages = () => {
    const bell = document.querySelectorAll('#view65 > span')[0];
    if (bell) {
      Ferdi.setBadge(bell.textContent);
    }
  };

  Ferdi.loop(getMessages);
};
