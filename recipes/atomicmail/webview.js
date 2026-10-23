const { join } = require('path');

module.exports = (Ferdium, settings) => {
  /*
   * ------------------------------------------------------------
   * Atomic Mail — Ferdium Recipe
   *
   * `settings` is the service configuration Ferdium passes to every
   * recipe module. It carries the official per-service switches,
   * including trapLinkClicks ("Open URLs within Ferdium").
   * ------------------------------------------------------------
   *
   * IMPORTANT:
   *
   * Navigation/popups are patched in the PAGE/MAIN WORLD through
   * Ferdium.injectJSUnsafe().
   *
   * webview.js itself runs in Ferdium's recipe/preload context.
   *
   * This distinction is important because Atomic's own page
   * JavaScript must see the patched window.open().
   */

  /*
   * Publish the official per-service switch to the page world.
   *
   * The main-world bridge (navigation.js) cannot see this preload
   * context, so the switch travels through the document element and
   * is read lazily when a click is routed. Ferdium reloads the
   * recipe when the switch changes, so the value is always current.
   */
  const trapLinkClicks = settings?.trapLinkClicks === true;

  const publishSwitch = () => {
    const root = document.documentElement;

    if (root) {
      root.dataset.ferdiumTrapLinkClicks = trapLinkClicks ? 'true' : 'false';
    }
  };

  publishSwitch();
  document.addEventListener('DOMContentLoaded', publishSwitch);

  /*
   * Dark mode: the official recipe hook (Ferdium.handleDarkMode).
   *
   * Using the custom handler keeps the per-service dark mode switch
   * working through Ferdium's bundled Dark Reader, without
   * hard-coding any Atomic stylesheet class.
   */
  if (typeof Ferdium.handleDarkMode === 'function') {
    Ferdium.handleDarkMode((isEnabled, helpers) => {
      if (isEnabled) {
        helpers.enableDarkMode();
      } else {
        helpers.disableDarkMode();
      }
    });
  } else {
    console.warn(
      'Ferdium.handleDarkMode is unavailable; dark mode falls back to the app default.',
    );
  }

  Ferdium.injectJSUnsafe(join(__dirname, 'navigation.js'));

  /*
   * ------------------------------------------------------------
   * Unread badge
   * ------------------------------------------------------------
   */

  const getNumericValue = text => {
    if (!text) {
      return 0;
    }

    const matches = String(text).match(/\d+/g);

    if (!matches) {
      return 0;
    }

    return matches.reduce(
      (total, value) => total + Ferdium.safeParseInt(value),
      0,
    );
  };

  const getMessages = () => {
    let unreadCount = 0;

    /*
     * Generic semantic detection.
     *
     * No Atomic route or CSS class is hard-coded.
     */
    const unreadElements = document.querySelectorAll(
      [
        '[aria-label*="unread" i]',
        '[aria-label*="unread message" i]',
        '[aria-label*="unread mail" i]',
        '[data-testid*="unread" i]',
        '[data-test*="unread" i]',
        '[data-cy*="unread" i]',
      ].join(','),
    );

    for (const element of unreadElements) {
      const ariaLabel = element.getAttribute('aria-label');

      const value =
        getNumericValue(ariaLabel) || getNumericValue(element.textContent);

      if (value > 0) {
        unreadCount += value;
      }
    }

    /*
     * Generic title fallback.
     */
    if (unreadCount === 0) {
      unreadCount = getNumericValue(document.title);
    }

    Ferdium.setBadge(unreadCount, 0);
  };

  Ferdium.loop(getMessages);

  /*
   * Preserve Ferdium CSS integration.
   */
  Ferdium.injectCSS(join(__dirname, 'service.css'));
};
