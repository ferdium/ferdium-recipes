const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdi => {
  const getMessages = () => {
    const selector = document.querySelector(
      '.subscriptions-feed .app-navigation-entry-utils-counter',
    );
    const direct = selector ? Ferdi.safeParseInt(selector.textContent) : 0;

    Ferdi.setBadge(direct);
  };

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
