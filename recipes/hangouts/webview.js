const _path = require('path');

// Distinctive substring of Google Chat's "unread" aria-label, per locale.
// Lowercased, matched case-insensitively, chosen to survive singular/plural.
const UNREAD_TOKENS = [
  'unread',        // English
  'sin leer',      // Spanish
  'não lid',       // Portuguese
  'non lu',        // French
  'ungelesene',    // German
  'non lett',      // Italian
  'непрочитанн',   // Russian
  '未読',           // Japanese
  '읽지 않은',       // Korean
  '未读',           // Chinese (Simplified)
  '未讀',           // Chinese (Traditional)
  'غير مقروء',      // Arabic
  'अपठित',         // Hindi
  'belum dibaca',  // Indonesian
  'ongelezen',     // Dutch
  'okunmamış',     // Turkish
  'nieprzeczytan', // Polish
];

module.exports = Ferdium => {
  let updateScheduled = false;
  let observer = null;

  const isUnreadBadge = label => {
    const normalizedLabel = label.toLowerCase();

    return UNREAD_TOKENS.some(token =>
      normalizedLabel.includes(token),
    );
  };

  const getMessages = () => {
    let count = 0;

    for (const el of document.querySelectorAll('[aria-label]')) {
      // Only roster section headers (Direct messages, Spaces, Apps...).
      // Skip "Shortcuts" (type 10), since its badge aggregates everything
      // and would double-count the individual section totals.
      const section = el.closest('[data-section-type]');

      if (
        !section ||
        section.getAttribute('data-section-type') === '10'
      ) {
        continue;
      }

      const label = el.getAttribute('aria-label') || '';

      if (!isUnreadBadge(label)) {
        continue;
      }

      const match = label.match(/\d+/);

      if (match) {
        count += Ferdium.safeParseInt(match[0]);
      }
    }

    Ferdium.setBadge(count);
  };

  // Google Chat may trigger many DOM mutations for a single update.
  // Batch them into one badge recalculation per animation frame.
  const scheduleUpdate = () => {
    if (updateScheduled) {
      return;
    }

    updateScheduled = true;

    requestAnimationFrame(() => {
      updateScheduled = false;
      getMessages();
    });
  };

  const startObserver = () => {
    if (!document.body) {
      setTimeout(startObserver, 250);
      return;
    }

    observer = new MutationObserver(mutations => {
      const hasRelevantChange = mutations.some(mutation => {
        if (mutation.type === 'attributes') {
          return true;
        }

        const target =
          mutation.target.nodeType === Node.ELEMENT_NODE
            ? mutation.target
            : mutation.target.parentElement;

        return Boolean(
          target?.closest?.('[data-section-type]') ||
          target?.querySelector?.('[data-section-type]'),
        );
      });

      if (hasRelevantChange) {
        scheduleUpdate();
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: [
        'aria-label',
        'data-section-type',
      ],
    });

    scheduleUpdate();
  };

  startObserver();

  // Periodic fallback in case Google Chat changes something that does not
  // generate a relevant observable mutation.
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.join(__dirname, 'service.css'));
};
