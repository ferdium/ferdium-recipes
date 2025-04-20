module.exports = Ferdium => {
  const getMessages = () => {
    const unreadEl = document.querySelector('a[data-page="unread"]');
    if (unreadEl == null) return Ferdium.setBadge(0);

    const matches = unreadEl.textContent.match(/Unread\s+\((\d+)\)/);
    if (matches == null) return Ferdium.setBadge(0);

    Ferdium.setBadge(Number(matches[1]));
  };

  Ferdium.loop(getMessages);

  // refresh page if inactive

  const refreshMinutes = 5;

  let timeout;
  let active;

  const onFocus = focus => {
    if (active === focus) {
      return;
    }

    active = focus;

    if (active && timeout != null) {
      // console.log("clearing timeout");
      clearTimeout(timeout);
      timeout = null;
    } else if (!active && timeout == null) {
      // console.log("starting timeout");
      timeout = setTimeout(
        () => {
          window.location.reload();
        },
        1000 * 60 * refreshMinutes,
      );
    }
  };

  window.addEventListener('blur', () => {
    onFocus(false);
  });

  window.addEventListener('focus', () => {
    onFocus(true);
  });

  onFocus(document.hasFocus());
};
