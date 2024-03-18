function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let count = 0;
    for (const e of document.querySelectorAll('.sg-counter-badge')) {
      if (e.textContent && e.textContent !== '') {
        count += Number.parseInt(e.textContent);
      }
    }
    Ferdium.setBadge(count, 0);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
