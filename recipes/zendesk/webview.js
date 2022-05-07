const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    let count = 0;
    const element = document.querySelector(
      '.dashboard-top-panel .indicators .stats-group .cell-value',
    );
    if (element) {
      count = Ferdium.safeParseInt(element.textContent);
    }

    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
