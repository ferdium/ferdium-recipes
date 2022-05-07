module.exports = Ferdium => {
  const getMessages = () => {
    const elements = document.querySelectorAll('.contact-list__message__unread-badge-counter');
    let count = 0;
    for (const element of elements) {
      count += Ferdium.safeParseInt(element.textContent);
    }
    Ferdium.setBadge(count, 0);
  };

  Ferdium.loop(getMessages);
};
