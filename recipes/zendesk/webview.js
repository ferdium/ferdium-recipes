const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdi => {
  const getMessages = () => {
    let count = 0;
    const element = document.querySelector(
      '.dashboard-top-panel .indicators .stats-group .cell-value',
    );
    if (element) {
      count = Ferdi.safeParseInt(element.textContent);
    }

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
