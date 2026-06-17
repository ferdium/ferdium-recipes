function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
  Ferdium.injectCSS(
    'https://cdn.statically.io/gh/ferdium/ferdium-recipes/main/recipes/google-calendar/calendar.css',
  );
  Ferdium.injectJSUnsafe(
    'https://cdn.statically.io/gh/ferdium/ferdium-recipes/main/recipes/google-calendar/webview-unsave.js',
  );

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
