const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    const element = document.querySelector('a[href^="/direct/inbox"]');
    Ferdium.setBadge(element ? Ferdium.safeParseInt(element.textContent) : 0);
  };

  Ferdium.loop(getMessages);

  // https://github.com/ferdium/ferdium-recipes/blob/9d715597a600710c20f75412d3dcd8cdb7b3c39e/docs/frontend_api.md#usage-4
  // Helper that activates DarkReader and injects your darkmode.css at the same time
  Ferdium.handleDarkMode((isEnabled) => {

    var url = new URL(window.location.href);
    var searchParams = url.searchParams;
    var isDarkModeParam = searchParams.get('theme');
    var changedParams = false;

    if (isEnabled) {
      isDarkModeParam ? null :
        (
          searchParams.set('theme', 'dark'),
          changedParams = true
        );
    } else {
      isDarkModeParam ?
        (
          searchParams.delete('theme', 'dark'),
          changedParams = true
        )
      : null;
    }

    changedParams ?
      (
        url.search = searchParams.toString(),
        window.location.href = url.toString()
      )
    : null;

  });

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
