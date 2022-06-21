const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    const directSelector = document.querySelector(
      '.subscriptions-feed .app-navigation-entry-utils-counter',
    );
    const direct = directSelector ? Ferdium.safeParseInt(directSelector.textContent) : 0;

    Ferdium.setBadge(direct);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
