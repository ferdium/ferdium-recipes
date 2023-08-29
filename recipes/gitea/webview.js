function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const directCountElement = document.querySelector('.notification_count');
    let directCount = 0;
    if (directCountElement) {
      directCount = Ferdium.safeParseInt(directCountElement.textContent);
    }

    Ferdium.setBadge(directCount, 0);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
