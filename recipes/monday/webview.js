const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdium => {
  const getMessages = () => {
    let count = 0;

    const counters = document.querySelectorAll('.surface-control-component .item-counter, .surface-control-component .view-item-counter');

    for (const counter of counters) {
      count += Ferdium.safeParseInt(counter.textContent);
    }

    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
