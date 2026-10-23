(() => {
  'use strict';

  /*
   * ============================================================
   * Atomic Mail — Dynamic in-app navigation bridge
   * ============================================================
   *
   * Goals:
   *
   * 1. NO Atomic hostname/path is hard-coded.
   * 2. Same-site new-context requests navigate THIS webview in place
   *    (account switching must not spawn a new Ferdium window).
   * 3. Cross-site HTTP(S) popups keep Ferdium's internal popup so
   *    OAuth windows and external links are not swallowed.
   * 4. window.open() with no arguments is handled.
   * 5. Dynamically-created links are handled.
   * 6. OAuth popup semantics are preserved (cross-site flows).
   * 7. window.opener remains available.
   * 8. Atomic keyboard shortcuts are NOT intercepted.
   * 9. Atomic SPA routing is NOT modified.
   * 10. mailto:/tel:/sms:/etc. remain OS-level protocols.
   *
   * Routing policy:
   *
   * Ferdium 7.x turns a popup request (a target name or window
   * features) into a standalone popup BrowserWindow and sends
   * everything else to the default browser (ferdium-app
   * src/index.ts, setWindowOpenHandler). Account switching inside
   * Atomic arrives as one of those popup requests, which is why it
   * surfaced as a new Ferdium window. A request that stays on the
   * same site means "another page of this same application", so it
   * is navigated in place. The official per-service switch "Open
   * URLs within Ferdium" (settings.trapLinkClicks, published by
   * webview.js as documentElement.dataset.ferdiumTrapLinkClicks)
   * extends this to cross-site clicks; with the switch off,
   * cross-site requests keep the popup.
   *
   * This file executes in the PAGE/MAIN WORLD.
   */

  const GLOBAL_MARKER = '__ATOMIC_FERDIUM_NAVIGATION_BRIDGE__';

  /*
   * Prevent double installation after reloads/injections.
   */
  if (window[GLOBAL_MARKER]) {
    return;
  }

  window[GLOBAL_MARKER] = true;

  /*
   * ------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------
   *
   * These are browser window FEATURES, not Atomic URLs.
   *
   * We deliberately do NOT specify:
   *
   *   login URL
   *   OAuth URL
   *   account URL
   *   hostname
   *   pathname
   *   API endpoint
   */

  const INTERNAL_POPUP_FEATURES =
    'popup=yes,' +
    'width=520,' +
    'height=720,' +
    'resizable=yes,' +
    'scrollbars=yes';

  /*
   * ------------------------------------------------------------
   * Helpers
   * ------------------------------------------------------------
   */

  const isString = value => typeof value === 'string';

  const isHttpUrl = value => {
    if (!isString(value)) {
      return false;
    }

    try {
      const url = new URL(value, window.location.href);

      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const resolveUrl = value => {
    if (!isString(value)) {
      return value;
    }

    try {
      return new URL(value, window.location.href).href;
    } catch {
      return value;
    }
  };

  const normalizeFeatures = features => {
    if (isString(features) && features.trim() !== '') {
      /*
       * Atomic/Ferdium may already supply features.
       *
       * Do not destroy them.
       *
       * Just make sure this is recognized as a real
       * popup/new-window request by Chromium.
       */
      if (/(?:^|,)\s*popup\s*=/i.test(features)) {
        return features;
      }

      return `${features},${INTERNAL_POPUP_FEATURES}`;
    }

    return INTERNAL_POPUP_FEATURES;
  };

  /*
   * ------------------------------------------------------------
   * In-place routing helpers
   * ------------------------------------------------------------
   */

  /*
   * The official per-service switch, published by webview.js on the
   * document element ("Open URLs within Ferdium" in Ferdium's
   * service settings). Missing dataset means off, the default.
   */
  const shouldTrapAllClicks = () => {
    try {
      return (
        document.documentElement?.dataset?.ferdiumTrapLinkClicks === 'true'
      );
    } catch {
      return false;
    }
  };

  /*
   * The brand label is the label right before the TLD
   * (mail.atomicmail.io -> atomicmail). It keeps a request inside
   * the same brand even when the TLD changes
   * (atomicmail.io -> atomicmail.ai). The length guard stops generic
   * second-level parts such as the "co" of "co.uk" from matching
   * unrelated sites.
   */
  const brandLabel = hostname => {
    const parts = String(hostname).toLowerCase().split('.');

    return parts.at(-2) ?? parts[0];
  };

  const isSameSite = href => {
    if (!isHttpUrl(href)) {
      return false;
    }

    try {
      const here = window.location.hostname.toLowerCase();

      const there = new URL(href, window.location.href).hostname.toLowerCase();

      /*
       * A host without a dot cannot be the parent of this page, so
       * the suffix checks only apply to two-label-or-longer hosts.
       */
      if (there === here) {
        return true;
      }

      if (
        there.includes('.') &&
        here.includes('.') &&
        (there.endsWith(`.${here}`) || here.endsWith(`.${there}`))
      ) {
        return true;
      }

      const hereBrand = brandLabel(here);
      const thereBrand = brandLabel(there);

      return (
        hereBrand === thereBrand &&
        hereBrand.length >= 4 &&
        here.split('.').pop().length <= 3 &&
        there.split('.').pop().length <= 3
      );
    } catch {
      return false;
    }
  };

  /*
   * Same-site requests, and every link while the official switch is
   * on, stay in this webview instead of opening a window.
   */
  const shouldOpenInPlace = href => shouldTrapAllClicks() || isSameSite(href);

  const navigateInPlace = url => {
    window.location.assign(url);
  };

  /*
   * ------------------------------------------------------------
   * Capture Ferdium's CURRENT page-world window.open
   * ------------------------------------------------------------
   *
   * IMPORTANT:
   *
   * At this point Ferdium's own windowOpenShim may already be
   * installed.
   *
   * We intentionally wrap THAT function.
   *
   * When we pass frameName/features, Ferdium's shim forwards the
   * call to the page's native window.open instead of sending the
   * URL to window.ferdium.open().
   */

  const ferdiumWindowOpen = window.open;

  if (typeof ferdiumWindowOpen !== 'function') {
    return;
  }

  /*
   * ------------------------------------------------------------
   * window.open bridge
   * ------------------------------------------------------------
   */

  const atomicWindowOpen = function (url, frameName, features) {
    /*
     * Resolve relative URLs dynamically.
     */
    const resolvedUrl =
      isString(url) && url.trim() !== '' ? resolveUrl(url) : url;

    /*
     * Non-web protocols are deliberately left to the normal
     * operating-system/browser protocol handler.
     *
     * Examples:
     *
     *   mailto:
     *   tel:
     *   sms:
     *   geo:
     *   file:
     */
    if (
      isString(resolvedUrl) &&
      resolvedUrl !== '' &&
      !isHttpUrl(resolvedUrl)
    ) {
      return ferdiumWindowOpen.call(window, resolvedUrl, frameName, features);
    }

    /*
     * Requests that belong to this same application, and every
     * request while the official switch is on, are shown in this
     * webview. Returning null matches the contract of a popup that
     * was not created, the same contract Ferdium's own shim uses
     * when it hands a URL to the default browser.
     */
    if (shouldOpenInPlace(resolvedUrl)) {
      navigateInPlace(resolvedUrl);
      return null;
    }

    /*
     * Cross-site HTTP(S) popup: request a real browsing context.
     *
     * This is the critical part for external windows.
     *
     * It causes Ferdium's current shim to take:
     *
     *   native window.open()
     *        ↓
     *   disposition === "new-window"
     *        ↓
     *   Ferdium internal popup
     *
     * instead of:
     *
     *   window.ferdium.open()
     *        ↓
     *   openExternalUrl()
     *        ↓
     *   external browser
     */
    const target =
      isString(frameName) && frameName.trim() !== '' ? frameName : '_blank';

    const popupFeatures = normalizeFeatures(features);

    return ferdiumWindowOpen.call(window, resolvedUrl, target, popupFeatures);
  };

  Object.defineProperty(atomicWindowOpen, GLOBAL_MARKER, {
    value: true,
    configurable: false,
    enumerable: false,
    writable: false,
  });

  window.open = atomicWindowOpen;

  /*
   * ------------------------------------------------------------
   * Dynamic target="_blank" / named target handling
   * ------------------------------------------------------------
   *
   * window.open() is not the only way a website creates a new
   * browsing context.
   *
   * Atomic may use:
   *
   *   <a target="_blank">
   *   <a target="some-window">
   *
   * Instead of maintaining a list of Atomic routes, we inspect
   * the actual DOM event dynamically.
   */

  const findAnchorFromEvent = event => {
    /*
     * composedPath() also handles shadow DOM.
     *
     * This is preferable to relying only on event.target.closest().
     */
    if (event && typeof event.composedPath === 'function') {
      const path = event.composedPath();

      for (const item of path) {
        if (item instanceof HTMLAnchorElement) {
          return item;
        }
      }
    }

    const target = event?.target;

    if (target && typeof target.closest === 'function') {
      return target.closest('a[href]');
    }

    return null;
  };

  const shouldRemainInFerdium = link => {
    if (!(link instanceof HTMLAnchorElement)) {
      return false;
    }

    /*
     * Never convert downloads into popup windows.
     */
    if (link.hasAttribute('download')) {
      return false;
    }

    const target = (link.getAttribute('target') || '').trim();

    if (target === '') {
      return false;
    }

    /*
     * These explicitly mean current browsing context.
     */
    const normalized = target.toLowerCase();

    if (
      normalized === '_self' ||
      normalized === '_top' ||
      normalized === '_parent'
    ) {
      return false;
    }

    /*
     * Every other target means a separate browsing context:
     *
     *   _blank
     *   _new
     *   named window
     *
     * and is therefore contained.
     */
    return isHttpUrl(link.href);
  };

  /*
   * Capture phase ensures we see dynamically-created links too.
   */
  document.addEventListener(
    'click',
    event => {
      const link = findAnchorFromEvent(event);

      if (!shouldRemainInFerdium(link)) {
        return;
      }

      /*
       * Do not let the browser perform its default
       * external/new-window action.
       */
      event.preventDefault();
      event.stopPropagation();

      if (shouldOpenInPlace(link.href)) {
        /*
         * Same site, or the official switch is on: show the page in
         * this webview instead of opening a window.
         */
        navigateInPlace(link.href);
        return;
      }

      const target = link.getAttribute('target') || '_blank';

      /*
       * Cross-site: route through our patched window.open.
       *
       * No URL matching is performed.
       */
      window.open(link.href, target, INTERNAL_POPUP_FEATURES);
    },
    true,
  );

  /*
   * Middle mouse button / auxiliary navigation.
   *
   * Middle click stays on the popup path on purpose: it is an
   * explicit request for a separate view, and it is not part of the
   * account-switch flow this bridge fixes.
   */
  document.addEventListener(
    'auxclick',
    event => {
      if (event.button !== 1) {
        return;
      }

      const link = findAnchorFromEvent(event);

      if (!shouldRemainInFerdium(link)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const target = link.getAttribute('target') || '_blank';

      window.open(link.href, target, INTERNAL_POPUP_FEATURES);
    },
    true,
  );

  /*
   * ------------------------------------------------------------
   * Dynamic form target handling
   * ------------------------------------------------------------
   *
   * Authentication/account flows can also use:
   *
   *   <form target="_blank">
   *
   * instead of window.open().
   */

  let generatedFormTarget = 0;

  document.addEventListener(
    'submit',
    event => {
      const form = event.target;

      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      const originalTarget = (form.getAttribute('target') || '').trim();

      const normalized = originalTarget.toLowerCase();

      if (normalized !== '_blank' && normalized !== '_new') {
        return;
      }

      if (!isHttpUrl(form.action)) {
        return;
      }

      if (shouldOpenInPlace(form.action)) {
        /*
         * Same site, or the official switch is on: submit into this
         * webview instead of creating a popup context.
         */
        form.setAttribute('target', '_self');
        return;
      }

      generatedFormTarget += 1;

      const targetName = `atomic-ferdium-popup-${generatedFormTarget}`;

      /*
       * Create the internal browsing context first.
       */
      window.open('about:blank', targetName, INTERNAL_POPUP_FEATURES);

      /*
       * Submit the existing form normally into that
       * already-created browsing context.
       */
      form.setAttribute('target', targetName);
    },
    true,
  );

  /*
   * ------------------------------------------------------------
   * Keyboard shortcuts
   * ------------------------------------------------------------
   *
   * DO NOT intercept keyboard events.
   *
   * We intentionally do NOT add:
   *
   *   keydown
   *   keyup
   *   keypress
   *
   * handlers.
   *
   * This means Atomic keeps complete ownership of its shortcut
   * system.
   *
   * New shortcuts added by Atomic in future versions continue
   * to work automatically.
   */

  /*
   * ------------------------------------------------------------
   * Developer diagnostic
   * ------------------------------------------------------------
   *
   * Can be inspected from DevTools:
   *
   *   window.__atomicFerdiumNavigationStatus
   *
   * This does not affect Atomic functionality.
   */

  window.__atomicFerdiumNavigationStatus = {
    installed: true,
    mode: 'dynamic',
    routesHardcoded: false,
    hostnameHardcoded: false,
    keyboardInterception: false,
    sameSiteInPlace: true,
    crossSitePopups: true,
    trapAllClicks: shouldTrapAllClicks(),
  };
})();
