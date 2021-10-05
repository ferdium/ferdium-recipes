module.exports = Ferdi => {
  const getMessages = () => {
    let count = 0;

    let span = document.querySelectorAll('.navigation-list-item--badgeCount');

    if (span.length === 0) {
      span = document.querySelectorAll(
        '.navigation-list-item--badgeCount-minimized',
      );
    }

    if (span.length > 0) {
      count = Ferdi.safeParseInt(span[0].textContent);
    }

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
