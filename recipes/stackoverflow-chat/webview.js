module.exports = Ferdium => {
  const getMessages = () => {
    const unreadSpan = document.querySelector(
      'span.flag-count.message-count.unread-count',
    );
    let directCount = 0;
    if (unreadSpan) {
      directCount = Ferdium.safeParseInt(unreadSpan.textContent);
    }
    Ferdium.setBadge(directCount);
  };
  Ferdium.loop(getMessages);
};
