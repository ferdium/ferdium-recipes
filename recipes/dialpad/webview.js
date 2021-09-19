const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (Ferdi) => {
  const getMessages = () => {
    var unreadCount = 0;
    $.each($('[data-qa-has-unreads]'), (idx, item) => unreadCount += Ferdi.safeParseInt(item.attributes["data-qa-has-unreads"].value));

    Ferdi.setBadge(unreadCount);
  }

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'whitemode.css'));
};
