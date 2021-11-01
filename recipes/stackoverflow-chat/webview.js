module.exports = Ferdi => {
  const getMessages = () => {
    const unreadSpan = document.querySelector(
      'span.flag-count.message-count.unread-count',
    );
    let directCount = 0;
    if (unreadSpan) {
      directCount = Ferdi.safeParseInt(unreadSpan.textContent);
    }
    Ferdi.setBadge(directCount);
  };
  Ferdi.loop(getMessages);
};
