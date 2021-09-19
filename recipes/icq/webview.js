module.exports = Ferdi => {
  const getMessages = () => {
    let directs = 0;
    const elements = document.getElementsByClassName('nwa-msg-counter icq-recent_state-read');
    for (let i = 0; i < elements.length; i++) {
      if (Ferdi.safeParseInt(elements[i].innerText.replace(/[^0-9.]/g, '')) > 0) {
        directs += 1; // count 1 per channel with messages
      }
    }

    Ferdi.setBadge(directs);
  };

  Ferdi.loop(getMessages);
};
