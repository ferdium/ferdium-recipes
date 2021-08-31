module.exports = (Ferdi) => {
  function getMessages() {
    const bell = document.querySelectorAll('#view65 > span')[0];
    if (bell) {
      Ferdi.setBadge(bell.innerText);
    }
  }

  Ferdi.loop(getMessages);
};
