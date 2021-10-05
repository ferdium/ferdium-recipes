var _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdi => {
  const getMessages = () => {
    const unreadSpan = document.querySelector(
      'span.flag-count.message-count.unread-count',
    );
    let directCount = 0;
    if (unreadSpan) {
      directCount = Ferdi.safeParseInt(unreadSpan.textContent);
    }
    Ferdi.setBadge(directCount);
  };
  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
