module.exports = Ferdium => {
  const getMessages = function getMessages() {
    const notificationsCounter = document.querySelector('.js-notificationsCounter');
    Ferdium.setBadge(Ferdium.safeParseInt(notificationsCounter.textContent));
  };

  Ferdium.loop(getMessages);
};
