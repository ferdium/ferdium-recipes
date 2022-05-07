module.exports = Ferdium => {
  // Tweetdeck redirect fix
  Ferdium.ipcRenderer.on('redirect-url', (event, url) => {
    window.location.assign(url);
  });

  const getMessages = () => {
    const elements = document.querySelectorAll('.msg-unread-count');
    let count = 0;
    if (elements[0]) {
      count = Ferdium.safeParseInt(elements[0].textContent);
    }

    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
