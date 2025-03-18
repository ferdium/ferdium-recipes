module.exports = Ferdium => {
  const getMessages = () => {
    const unreadEl = document.querySelector('a[data-page="unread"]');
    if (unreadEl == null) return Ferdium.setBadge(0);

    const matches = unreadEl.textContent.match(/Unread\s+\((\d+)\)/);
    if (matches == null) return Ferdium.setBadge(0);

    Ferdium.setBadge(Number(matches[1]));
  };

  Ferdium.loop(getMessages);
};
