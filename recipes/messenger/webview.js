function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

function hideInstallMessage() {
  const installMessage = document.querySelector('.usczdcwk');
  if (installMessage) {
    installMessage.style.display =
      installMessage.style.display === 'none'
        ? installMessage.style.display
        : 'none';
  }
}

module.exports = (Ferdium, settings) => {
  const getMessages = () => {
    let count = 0;

    try {
      let newMessengerUI = false;
      let newUICount = 0;

      /*
       * Try the counting with the new Messenger.com UI via ariaLabel on
       * section tabs. Supports both messenger.com (/t/) and
       * facebook.com/messages (/messages/t/) paths.
       * Original code crashed when selector returned null ( accessing .ariaLabel
       * on null). Use optional chaining and support both URL prefixes.
       */
      const hrefPrefixes = [
        '/t/',
        '/messages/t/',
        '/requests/t/',
        '/messages/requests/t/',
        '/marketplace/t/',
        '/messages/marketplace/t/',
      ];
      for (const prefix of hrefPrefixes) {
        const anchor = document.querySelector(
          `a[href^='${prefix}'][role='link'][tabindex='0']`,
        );
        const label =
          anchor?.ariaLabel || anchor?.getAttribute?.('aria-label') || null;
        if (label) {
          newMessengerUI = true;
          const match = label.match(/(\d+)/g);
          if (match) {
            newUICount += Ferdium.safeParseInt(match[0]);
          }
        }
      }

      // Also try generic query for any tab with aria-label containing a number
      // e.g. Facebook's messenger tabs may use different href patterns
      if (!newMessengerUI) {
        const genericTabs = document.querySelectorAll(
          'a[role="link"][tabindex="0"][aria-label]',
        );
        for (const tab of genericTabs) {
          const label = tab.ariaLabel || tab.getAttribute('aria-label');
          if (label && /unread/i.test(label) && /(\d+)/.test(label)) {
            newMessengerUI = true;
            const m = label.match(/(\d+)/g);
            if (m) newUICount += Ferdium.safeParseInt(m[0]);
          }
        }
      }

      if (newMessengerUI) {
        count = newUICount;
      } else {
        // Strategy 2: facebook.com/messages thread list uses
        // [data-testid="mwthreadlist-item"] for each conversation.
        // Unread threads contain a blue dot / bold indicator with classes
        // like is6700om / o48pnaf2 / lrazzd5p etc. Check those plus
        // aria-label fallback.
        const threadItems = document.querySelectorAll(
          '[data-testid="mwthreadlist-item"]',
        );
        if (threadItems.length > 0) {
          let threadCount = 0;
          for (const node of threadItems) {
            const hasUnread =
              !!node.querySelector(
                '.lrazzd5p, .is6700om, .o48pnaf2, .pq6dq46d.is6700om.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.s45kfl79.emlxlaya.bkmhp75w.spb7xbtv.cyypbtt7.fwizqjfa, [aria-label*="Unread"], [aria-label*="unread"]',
              ) ||
              (node.getAttribute('aria-label') || '')
                .toLowerCase()
                .includes('unread');
            const isMuted = !!node.querySelector(
              '.a8c37x1j.ms05siws.l3qrxjdp.b7h9ocf4.trssfv1o, [aria-label*="Muted"], [aria-label*="muted"]',
            );
            if (hasUnread && !isMuted) threadCount += 1;
          }
          if (threadCount > 0) {
            count = threadCount;
          }
        }

        // Strategy 3: Legacy messenger.com selectors (fallback if data-testid not present)
        if (count === 0) {
          const legacyItems = document.querySelectorAll(
            '.bp9cbjyn.j83agx80.owycx6da:not(.btwxx1t3)',
          );
          if (legacyItems.length > 0) {
            count = [...legacyItems]
              .map(elem => {
                const hasPing = !!elem.querySelector(
                  '.pq6dq46d.is6700om.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.s45kfl79.emlxlaya.bkmhp75w.spb7xbtv.cyypbtt7.fwizqjfa, .is6700om, .lrazzd5p, .o48pnaf2',
                );
                const isMuted = !!elem.querySelector(
                  '.a8c37x1j.ms05siws.l3qrxjdp.b7h9ocf4.trssfv1o',
                );
                const ariaUnread = (elem.getAttribute('aria-label') || '')
                  .toLowerCase()
                  .includes('unread');
                return (hasPing || ariaUnread) && !isMuted;
              })
              .reduce((prev, curr) => prev + curr, 0);
          }
        }

        // Strategy 4: Generic unread aria-label counting (works on both domains)
        if (count === 0) {
          const unreadByAria = document.querySelectorAll(
            '[aria-label*="Unread"]',
          );
          // Filter out muted and non-thread items heuristically
          if (unreadByAria.length > 0 && unreadByAria.length < 100) {
            let ariaCount = 0;
            for (const el of unreadByAria) {
              const label = el.getAttribute('aria-label') || '';
              // Count only thread-like entries, not buttons
              if (/unread/i.test(label)) {
                // Avoid counting the same thread twice via nested elements
                const isThread =
                  el.closest('[data-testid="mwthreadlist-item"]') ||
                  el.closest('.bp9cbjyn.j83agx80.owycx6da') ||
                  el.matches('[data-testid="mwthreadlist-item"]');
                if (isThread) ariaCount += 1;
              }
            }
            if (ariaCount > 0) count = ariaCount;
          }
        }

        // Strategy 5: Title fallback e.g. "(2) Messenger" or "(1) Facebook"
        if (count === 0) {
          const titleMatch = document.title.match(/^\((\d+)\)/);
          if (titleMatch) {
            count = Ferdium.safeParseInt(titleMatch[1]);
          }
        }

        /*
         * add count of message requests on top of notification counter
         */
        const messageRequestsElement = document.querySelector(
          '._5nxf, [data-testid="message-requests-count"], a[href*="requests"] [aria-label*="request" i]',
        );
        if (messageRequestsElement) {
          const txt =
            messageRequestsElement.textContent ||
            messageRequestsElement.getAttribute('aria-label') ||
            '';
          const req = Ferdium.safeParseInt(txt);
          if (!Number.isNaN(req) && req > 0) count += req;
        }
      }
    } catch (error) {
      // Never break badge loop on selector errors
      console.error('Messenger getMessages error:', error);
    }

    Ferdium.setBadge(count);
  };

  const loopRoutine = () => {
    getMessages();
    hideInstallMessage();
  };

  Ferdium.loop(loopRoutine);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  localStorage.setItem(
    '_cs_desktopNotifsEnabled',
    JSON.stringify({
      __t: Date.now(),
      __v: true,
    }),
  );

  if (typeof Ferdium.onNotify === 'function') {
    Ferdium.onNotify(notification => {
      if (typeof notification.title !== 'string') {
        notification.title =
          ((notification.title.props || {}).content || [])[0] || 'Messenger';
      }

      if (typeof notification.options.body !== 'string') {
        notification.options.body =
          (((notification.options.body || {}).props || {}).content || [])[0] ||
          '';
      }

      return notification;
    });
  }

  document.addEventListener(
    'click',
    event => {
      const link = event.target.closest('a[href^="http"]');
      const button = event.target.closest('button[title^="http"]');

      if (link || button) {
        const url = link
          ? link.getAttribute('href')
          : button.getAttribute('title');

        event.preventDefault();
        event.stopPropagation();

        if (url.includes('fbsbx.com') || settings.trapLinkClicks === true) {
          // 'fbsbx.com is Facebook file hosting service. Always open file downloads in Ferdium.
          window.location.href = url;
        } else {
          Ferdium.openNewWindow(url);
        }
      }
    },
    true,
  );
};
