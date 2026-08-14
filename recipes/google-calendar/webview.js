function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  // if the user is on googlecalendar landing page, go to the login page.
  if (
    location.hostname === 'workspace.google.com' &&
    location.href.includes('products/calendar/')
  ) {
    location.href =
      'https://accounts.google.com/AccountChooser?continue=https://calendar.google.com/u/0/';
  }

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
  // calendar.css is linked rather than passed to Ferdium.injectCSS, because
  // injectCSS fills a <style> element via innerHTML, which calendar.google.com
  // rejects under `require-trusted-types-for 'script'`. Same approach as the
  // darkmode.css workaround below.
  const calendarCssId = 'cssFranzModal';
  if (!document.querySelector(`#${calendarCssId}`)) {
    const head = document.querySelectorAll('head')[0];
    const link = document.createElement('link');
    link.id = calendarCssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href =
      'https://cdn.statically.io/gh/ferdium/ferdium-recipes/main/recipes/google-calendar/calendar.css';
    link.media = 'all';
    head.append(link);
  }

  // Injected from disk: injectJSUnsafe only reads local files, handing the
  // source to webview.executeJavaScript (which page CSP does not apply to).
  // Passing it a URL silently injected nothing at all.
  Ferdium.injectJSUnsafe(_path.default.join(__dirname, 'webview-unsafe.js'));

  Ferdium.handleDarkMode(isEnabled => {
    const cssId = 'cssDarkModeWorkaround';

    if (isEnabled) {
      // Workaround for loading darkmode.css
      if (!document.querySelector(`#${cssId}`)) {
        const head = document.querySelectorAll('head')[0];
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href =
          'https://cdn.statically.io/gh/ferdium/ferdium-recipes/main/recipes/google-calendar/darkmode.css';
        link.media = 'all';
        head.append(link);
      }
    } else {
      document.querySelector(`#${cssId}`)?.remove();
    }
  });
};
