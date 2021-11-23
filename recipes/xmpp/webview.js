module.exports = (Ferdi) => {
  function getMessages() {
    let direct = 0;
    for (const indicator of document.querySelectorAll('.msgs-indicator')) {
      direct += Ferdi.safeParseInt(indicator.textContent)
    }

    direct = direct / 2 // as the messages are provided in 2 different locations..
    Ferdi.setBadge(direct);
  }

  Ferdi.loop(getMessages);
};
