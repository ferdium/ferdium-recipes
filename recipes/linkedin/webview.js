function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let count = 0;

    if (window.location.pathname.includes('messaging')) {
      count = document.querySelectorAll(
        '.msg-conversation-card__unread-count',
      ).length;
    } else {
      const element = document.querySelector(
        '.nav-item--messaging .nav-item__badge-count',
      );
      if (element) {
        count = Ferdium.safeParseInt(element.textContent);
      }
    }

    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
