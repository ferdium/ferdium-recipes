function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = (Ferdium, settings) => {
  // adapted from the franz-custom-website recipe, for opening
  // links according to  the user's preference (Ferdium/ext.browser)
  document.addEventListener(
    'click',
    event => {
      const link = event.target.closest('a');
      const button = event.target.closest('button');

      if (link || button) {
        const url = link
          ? link.getAttribute('href')
          : button.getAttribute('title');

        // check if the URL is relative or absolute
        if (url.startsWith('/')) {
          return;
        }

        // check if we have a valid URL that is not a script nor an image:
        if (url && url !== '#' && !Ferdium.isImage(link)) {
          event.preventDefault();
          event.stopPropagation();

          if (settings.trapLinkClicks === true) {
            window.location.href = url;
          } else {
            Ferdium.openNewWindow(url);
          }
        }
      }
    },
    true,
  );

  const getMessages = () => {
    const element = document.querySelector('a[href^="/direct/inbox"] span');
    Ferdium.setBadge(
      element && element.textContent
        ? Ferdium.safeParseInt(element.textContent)
        : 0,
    );
  };

  Ferdium.loop(getMessages);

  // https://github.com/ferdium/ferdium-recipes/blob/9d715597a600710c20f75412d3dcd8cdb7b3c39e/docs/frontend_api.md#usage-4
  // Helper that activates DarkReader and injects your darkmode.css at the same time
  Ferdium.handleDarkMode(isEnabled => {
    const url = new URL(window.location.href);
    const { searchParams } = url;
    const isDarkModeParam = searchParams.get('theme');
    let changedParams = false;

    if (isEnabled) {
      isDarkModeParam
        ? null
        : (searchParams.set('theme', 'dark'), (changedParams = true));
    } else {
      isDarkModeParam
        ? (searchParams.delete('theme', 'dark'), (changedParams = true))
        : null;
    }

    changedParams
      ? ((url.search = searchParams.toString()),
        (window.location.href = url.toString()))
      : null;
  });

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
