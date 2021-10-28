const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdi => {
  const getMessages = () => {
    const element = document.querySelector('a[href^="/direct/inbox"]');
    Ferdi.setBadge(element ? Ferdi.safeParseInt(element.textContent) : 0);
  };

  Ferdi.loop(getMessages);

  // https://github.com/getferdi/recipes/blob/9d715597a600710c20f75412d3dcd8cdb7b3c39e/docs/frontend_api.md#usage-4
  // Helper that activates DarkReader and injects your darkmode.css at the same time
  Ferdi.handleDarkMode((isEnabled, helpers) => {
    if (isEnabled) {
      helpers.enableDarkMode();
      if (!helpers.isDarkModeStyleInjected()) {
        helpers.injectDarkModeStyle();
      }
    } else {
      helpers.disableDarkMode();
      helpers.removeDarkModeStyle();
    }
  });

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
