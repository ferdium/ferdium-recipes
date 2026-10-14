// How often to ask Asyntai for the unread count.
const REFRESH_MS = 30_000;

// The notification bell is only in the header of a signed-in Asyntai page.
// Its badge counts unread notifications, plus one for new chats and one for
// new leads.
const findBell = () =>
  document.querySelector('#notifBadgeDesktop') ||
  document.querySelector('#notifBadgeMobile');

module.exports = Ferdium => {
  let count = 0;
  let known = false;
  let lastFetch = 0;
  let inFlight = false;
  let lastShown = null;

  const refresh = () => {
    inFlight = true;
    lastFetch = Date.now();
    window
      .fetch('/api/notifications/unread-count/', {
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
      })
      .then(response => (response.ok ? response.json() : null))
      .then(data => {
        if (data && Number.isFinite(data.unread_count)) {
          count = data.unread_count;
          known = true;
          Ferdium.setBadge(count);
        }
      })
      .catch(() => {})
      .finally(() => {
        inFlight = false;
      });
  };

  const getMessages = () => {
    const bell = findBell();
    if (!bell) {
      // The Asyntai sign-in page means the user signed out: clear the badge.
      // On any other page (for example Google sign-in) keep the last badge.
      if (document.querySelector('#auth-form')) {
        count = 0;
        known = true;
        lastShown = null;
        Ferdium.setBadge(0);
      }
      return;
    }

    // The page fills the bell after it loads and when items are marked read.
    // A number in the bell is current, so use it at once. An empty bell can
    // mean "zero" or "not loaded yet", so ask the server instead.
    const shown = bell.classList.contains('has-unread') ? bell.textContent : '';
    if (shown !== lastShown) {
      lastShown = shown;
      if (shown) {
        count = Ferdium.safeParseInt(shown);
        known = true;
      } else {
        lastFetch = 0;
      }
    }

    if (!inFlight && Date.now() - lastFetch >= REFRESH_MS) {
      refresh();
    }

    if (known) {
      Ferdium.setBadge(count);
    }
  };

  Ferdium.loop(getMessages);
};
