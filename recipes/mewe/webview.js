const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdi => {
  const calculateTotalDirectMessages = () =>
    Array.from(document.getElementsByClassName('chats-list-element'))
      .map(el => Ferdi.safeParseInt(el.querySelector('.m-indicator .number').innerHTML))
      .reduce((curr, prev) => curr + prev, 0);

  Ferdi.loop(() => Ferdi.setBadge(calculateTotalDirectMessages()));
  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
