module.exports = Ferdi => {
  const getMessages = () => {
    const elements = document.getElementsByClassName('unread');

    let count = 0;
    for (let i = 0; i < elements.length; i++) {
      if (Ferdi.safeParseInt(elements[i].innerText.replace(/[^0-9.]/g, '')) > 0) {
        count++; // count 1 per channel with messages
      }
    }

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
