const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (Ferdium) => {
  const getMessages = () => {
    var unreadCount = 0;
    $.each($('[data-qa-has-unreads]'), (idx, item) => unreadCount += Ferdium.safeParseInt(item.attributes["data-qa-has-unreads"].value));

    Ferdium.setBadge(unreadCount);
  }

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'whitemode.css'));
};
