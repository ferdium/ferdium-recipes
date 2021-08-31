module.exports = Ferdi => {
  const getMessages = function getMessages() {
    const element = document.querySelector("#app button[data-test-id='notificationsCount']");
    Ferdi.setBadge(element ? Ferdi.safeParseInt(element.innerText) : 0);
  };

  Ferdi.loop(getMessages);
};
