function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = (Ferdium, settings) => {
  const getMessages = () => {
    const chatBadge = document.querySelector(
      '#home-tab-chat .header-icon__badge',
    );

    const directCount = chatBadge
      ? Ferdium.safeParseInt(chatBadge.textContent)
      : 0;

    Ferdium.setBadge(directCount, 0);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  // TODO: See how this can be moved into the main ferdium app and sent as an ipc message for opening with a new window or same Ferdium recipe's webview based on user's preferences
  document.addEventListener(
    'click',
    event => {
      const link = event.target.closest('a[href^="http"]');
      const button = event.target.closest('button[title^="http"]');

      if (link || button) {
        const url = link
          ? link.getAttribute('href')
          : button.getAttribute('title');

        if (!Ferdium.isImage(link)) {
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
};
