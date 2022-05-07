const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    const elements = document.querySelectorAll(
      '.badge.unread-count:not(.ng-hide)',
    );
    let count = 0;

    for (const element of elements) {
      try {
        count += Ferdium.safeParseInt(element.textContent);
      } catch (error) {
        console.error(error);
      }
    }

    // set Ferdium badge
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
