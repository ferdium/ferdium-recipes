function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const directCountSelector = [
      ...document.querySelectorAll('[data-region="count-container"]'),
    ];
    const totalMessageCount = directCountSelector.reduce(
      (count, item) => count + Ferdium.safeParseInt(item.textContent),
      0,
    );

    Ferdium.setBadge(totalMessageCount, 0);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
