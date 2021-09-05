// Tweetdeck redirect fix
Ferdi.ipcRenderer.on('redirect-url', (event, url) => {
  window.location.assign(url);
});

module.exports = Ferdi => {
  const getMessages = function getMessages() {
    const elements = document.querySelectorAll('.msg-unread-count');
    let count = 0;
    if (elements[0]) {
      count = Ferdi.safeParseInt(elements[0].innerHTML);
    }

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
