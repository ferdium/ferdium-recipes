function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const notificationsSelector = document.querySelector(
    '[class*=header_] [class*=content_] [class*=actions_] [class*=notificationsButton_]',
  );

  const getMessages = () => {
    if (notificationsSelector) {
      Ferdium.setBadge(notificationsSelector.textContent);
    }
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
