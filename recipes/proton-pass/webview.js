function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  // TODO: If your Proton Pass service has unread messages, uncomment these lines to implement the logic for updating the badges
  // const getMessages = () => {
  //   // TODO: Insert your notification-finding code here
  //   Ferdium.setBadge(0, 0);
  // };
  // Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  // fix React's mangling of the search field
  // see https://github.com/ferdium/ferdium-app/issues/1844
  const SELECTOR = 'input[data-testid="input-input-element"]';

  const wire = el => {
    if (!el || el.__queryFixed) return;
    el.__queryFixed = true;

    const setEndIfAllSelected = () => {
      try {
        const len = el.value.length;
        if (len > 0 && el.selectionStart === 0 && el.selectionEnd === len) {
          el.setSelectionRange(len, len);
        }
      } catch {}
    };

    const nudge = () => {
      setEndIfAllSelected();
      if (typeof queueMicrotask === 'function') queueMicrotask(setEndIfAllSelected);
      requestAnimationFrame(setEndIfAllSelected);
      setTimeout(setEndIfAllSelected, 16);
    };

    ['input', 'selectionchange', 'compositionend'].forEach(evt =>
      el.addEventListener(evt, nudge, true)
    );

    nudge();
  };

  const findAndWire = () => {
    const el = document.querySelector(SELECTOR);
    if (el) wire(el);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', findAndWire, { once: true });
  } else {
    findAndWire();
  }

  new MutationObserver(findAndWire).observe(document.documentElement || document, {
    childList: true,
    subtree: true,
  });
};
