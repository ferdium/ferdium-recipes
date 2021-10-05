module.exports = Ferdi => {
  // Tweetdeck redirect fix
  Ferdi.ipcRenderer.on('redirect-url', (event, url) => {
    window.location.assign(url);
  });

  const getMessages = () => {
    const elements = document.querySelectorAll('.msg-unread-count');
    let count = 0;
    if (elements[0]) {
      count = Ferdi.safeParseInt(elements[0].textContent);
    }

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
