const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const calculateTotalDirectMessages = () =>
    [...document.querySelectorAll('.chats-list-element')]
      .map(el =>
        Ferdium.safeParseInt(
          el.querySelector('.m-indicator .number').textContent,
        ),
      )
      .reduce((curr, prev) => curr + prev, 0);

  Ferdium.loop(() => Ferdium.setBadge(calculateTotalDirectMessages()));
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
