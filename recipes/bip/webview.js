module.exports = Ferdi => {
  const getMessages = () => {
    const elements = document.querySelectorAll('.contact-list__message__unread-badge-counter');
    let count = 0;
    for (const element of elements) {
      count += Ferdi.safeParseInt(element.textContent);
    }
    Ferdi.setBadge(count, 0);
  };

  Ferdi.loop(getMessages);
};
