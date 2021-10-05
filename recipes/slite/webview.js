module.exports = Ferdi => {
  const getMessages = () => {
    const element = document.querySelector(
      "#app button[data-test-id='notificationsCount']",
    );
    Ferdi.setBadge(element ? Ferdi.safeParseInt(element.textContent) : 0);
  };

  Ferdi.loop(getMessages);
};
