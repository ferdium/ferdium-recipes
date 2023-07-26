function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let directCount = 0;
    const element = document.querySelector(
      '.ws-navigation-button__indicator.ws-navigation-button-indicator',
    );
    if (element) {
      directCount = Ferdium.safeParseInt(element.textContent);
    }

    Ferdium.setBadge(directCount);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
