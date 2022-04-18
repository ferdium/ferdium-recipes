module.exports = (Ferdium) => {
  function getMessages() {
    let direct = 0;
    for (const indicator of document.querySelectorAll('.msgs-indicator')) {
      direct += Ferdium.safeParseInt(indicator.textContent)
    }

    direct = direct / 2 // as the messages are provided in 2 different locations..
    Ferdium.setBadge(direct);
  }

  Ferdium.loop(getMessages);
};
