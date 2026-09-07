function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let direct = 0;

    try {
      // Bluesky uses LeftNav (desktop) and BottomBar (mobile/web) with same hrefs.
      // Notification count is rendered as a Text with aria-label like "3 unread items"
      // inside a[href="/notifications"]. Same for chat: a[href="/messages"].
      // This mirrors the Twitter recipe pattern: sum notifications + DMs.
      const selectors = [
        // Desktop LeftNav + Mobile BottomBar — notifications
        'a[href^="/notifications"] [aria-label*="unread"]',
        // Chat / messages
        'a[href^="/messages"] [aria-label*="unread"]',
      ];

      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) {
          // textContent is the count like "3" or "30+", aria-label also contains it
          const txt = (
            el.textContent ||
            el.getAttribute('aria-label') ||
            ''
          ).trim();
          const m = txt.match(/(\d+)/);
          if (m) direct += Ferdium.safeParseInt(m[1]);
        }
      }

      // Fallback: numeric pill inside the link (when aria-label not present)
      if (direct === 0) {
        for (const href of ['/notifications', '/messages']) {
          const link = document.querySelector(`a[href^="${href}"]`);
          if (!link) continue;
          // badge is small pill with 1-3 digit text; filter out post counts etc.
          const candidates = link.querySelectorAll('div');
          for (const c of candidates) {
            const t = (c.textContent || '').trim();
            if (
              /^\d+\+?$/.test(t) &&
              t.length <= 3 &&
              c.children.length === 0
            ) {
              direct += Ferdium.safeParseInt(t);
              break; // one badge per link
            }
          }
        }
      }

      // hasNew dot (8px blue dot) for messages when no count — count as indirect (1)
      if (direct === 0) {
        const hasNewDot = document.querySelector(
          'a[href^="/messages"] div[style*="width: 8px"]',
        );
        if (hasNewDot) direct = 1;
      }

      // Title fallback: bskyTitle prefixes "(3) " when unread — src/lib/strings/headings.ts
      if (direct === 0) {
        const m = document.title.match(/^\((\d+)\+?\)/);
        if (m) direct = Ferdium.safeParseInt(m[1]);
      }
    } catch (error) {
      console.error('Bluesky getMessages error:', error);
    }

    Ferdium.setBadge(direct);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
