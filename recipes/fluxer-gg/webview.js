function isVisible(el) {
  try {
    return el && el.getClientRects && el.getClientRects().length > 0;
  } catch {
    return false;
  }
}

module.exports = Ferdium => {
  const selectors = [
    '.notification-count',
    '.notif-count',
    '.badge',
    '.unread-count',
    '.unread',
    '.notifications .count',
    '#notifications .count',
  ];

  const safeInt = v => Ferdium.safeParseInt(v || 0);

  const getMessages = () => {
    let direct = 0;
    let indirect = 0;

    // Collect numeric badges only from visible elements to avoid accidental concatenation
    const seen = new Set();
    const candidateSelector = selectors.join(',');
    for (const el of document.querySelectorAll(candidateSelector)) {
      if (!el || seen.has(el) || !isVisible(el)) continue;
      const txt = (el.textContent || '').trim();
      // only accept purely numeric values (1-4 digits)
      const m = txt.match(/^\d{1,4}$/);
      if (m) {
        direct += safeInt(m[0]);
        seen.add(el);
      }
    }

    // data-count attributes (visible only)
    for (const el of document.querySelectorAll('[data-count]')) {
      if (!isVisible(el)) continue;
      const v = (el.dataset.count || '').trim();
      if (/^\d{1,5}$/.test(v)) direct += safeInt(v);
    }

    // aria-labels sometimes contain counts like "3 unread"
    for (const el of document.querySelectorAll('[aria-label]')) {
      if (!isVisible(el)) continue;
      const label = (el.getAttribute('aria-label') || '').trim();
      const m = label.match(/^(\d{1,4})\b/);
      if (m) direct += safeInt(m[1]);
    }

    // Fallback to document.title only when we found nothing above
    if (direct === 0) {
      const title = document.title || '';
      const titleMatch = title.match(/\((\d{1,4})\)/);
      if (titleMatch) direct = safeInt(titleMatch[1]);
    }

    Ferdium.setBadge(direct, indirect);
  };

  const getActiveDialogTitle = () => {
    const el = document.querySelector('h1, .title, .chat-title');
    Ferdium.setDialogTitle(el ? el.textContent.trim() : '');
  };

  const loopFunc = () => {
    try {
      getMessages();
      getActiveDialogTitle();
    } catch (error) {
      console.error(error);
    }
  };

  Ferdium.loop(loopFunc);
};
