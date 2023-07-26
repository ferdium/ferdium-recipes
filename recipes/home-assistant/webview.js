function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const badges = document
      .querySelector('home-assistant')
      .shadowRoot.querySelector('home-assistant-main')
      .shadowRoot.querySelector('ha-sidebar')
      .shadowRoot.querySelectorAll('.notification-badge');
    if (badges.length > 0) {
      const count = Ferdium.safeParseInt(
        badges[0].textContent.replaceAll(/[^\p{N}]/gu, ''),
      );
      Ferdium.setBadge(count);
    } else {
      Ferdium.setBadge(0);
    }
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
