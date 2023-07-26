function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const notificationBadge = document.querySelector(
      '.siteHeader__topLevelItem--profileIcon .headerPersonalNav .modalTrigger .headerPersonalNav__icon .headerPersonalNav__flag',
    );
    const notification = notificationBadge
      ? Ferdium.safeParseInt(notificationBadge.textContent)
      : 0;

    Ferdium.setBadge(notification);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
