function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const notifications = document.querySelectorAll('[class*=_3W-zkl4-bnVKzJ]');
    Ferdium.setBadge(0, notifications.length > 0 ? 1 : 0);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
