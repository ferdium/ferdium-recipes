module.exports = Ferdi => {
  const getMessages = () => {
    const elements = document.querySelectorAll('.unread');

    let count = 0;
    for (const element of elements) {
      if (
        Ferdi.safeParseInt(
          element.textContent && element.textContent.replace(/[^\d.]/g, ''),
        ) > 0
      ) {
        count++; // count 1 per channel with messages
      }
    }

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
