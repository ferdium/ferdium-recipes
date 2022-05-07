module.exports = Ferdium => {
  const getMessages = () => {
    const element = document.querySelector(
      "#app button[data-test-id='notificationsCount']",
    );
    Ferdium.setBadge(element ? Ferdium.safeParseInt(element.textContent) : 0);
  };

  Ferdium.loop(getMessages);
};
