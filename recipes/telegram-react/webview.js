module.exports = Ferdi => {
  const getMessages = () => {
    let count = 0;
    const elements = document.querySelectorAll('.chatlist > li:not(.is-muted)');
    if (elements) {
      for (const element of elements) {
        if (
          element.querySelector('.unread') &&
          element.querySelector('.unread').textContent !== 0
        ) {
          count += Ferdi.safeParseInt(
            element.querySelector('.unread').textContent,
          );
        }
      }
    }
    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
