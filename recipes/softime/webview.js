module.exports = Ferdium => {
  // Running timers are only rendered on the "Today" page. Each one is a
  // `[data-timer-card]` element whose value is the time entry UUID; cards for
  // timers that have not been started yet use "new" or "draft-<n>".
  // On other pages there are no cards, so the last known count is kept.
  let lastCount = 0;

  const getMessages = () => {
    const cards = document.querySelectorAll('[data-timer-card]');
    if (cards.length > 0) {
      lastCount = [...cards].filter(card => {
        const id = card.dataset.timerCard;
        return id && id !== 'new' && !id.startsWith('draft-');
      }).length;
    }
    Ferdium.setBadge(lastCount);
  };

  Ferdium.loop(getMessages);
};
