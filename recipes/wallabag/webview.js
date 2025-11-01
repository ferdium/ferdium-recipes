function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  function getUnreadEntries() {
    const element = document.querySelector('a[href="/unread/list"]>span.items-number');
    if (element) {
      const parsedValue = Ferdium.safeParseInt(element.textContent);
      Ferdium.setBadge(parsedValue);
    }
  }

  const loopFunc = () => {
    getUnreadEntries();
  };

  Ferdium.loop(loopFunc);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
