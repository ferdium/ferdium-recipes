function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const elements = document.querySelectorAll(
      '.contact-list__message__unread-badge-counter',
    );
    let count = 0;
    for (const element of elements) {
      count += Ferdium.safeParseInt(element.textContent);
    }
    Ferdium.setBadge(count, 0);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
