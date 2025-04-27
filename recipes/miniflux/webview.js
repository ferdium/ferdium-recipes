module.exports = Ferdium => {
  const getMessages = () => {
    const unreadEl = document.querySelector('a[data-page="unread"]');
    if (unreadEl == null) return Ferdium.setBadge(0);

    const matches = unreadEl.textContent.match(/Unread\s+\((\d+)\)/);
    if (matches == null) return Ferdium.setBadge(0);

    Ferdium.setBadge(Number(matches[1]));
  };

  Ferdium.loop(getMessages);

  // only reload page if not reading an entry or in settings

  if (
    window.location.pathname.includes('/entry/') ||
    window.location.pathname == '/settings'
  ) {
    return;
  }

  const refreshMinutes = 5;

  // console.log("after "+refreshMinutes+" minutes")

  setTimeout(
    () => {
      window.location.reload();
    },
    1000 * 60 * refreshMinutes,
  );
};
