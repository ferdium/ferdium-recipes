function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const directElements = document.querySelectorAll('.unreadcount');
    let direct = 0;
    for (const directElement of directElements) {
      direct += Ferdium.safeParseInt(directElement.textContent);
    }
    Ferdium.setBadge(direct);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
