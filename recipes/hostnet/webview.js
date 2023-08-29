function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    Ferdium.setBadge(
      Ferdium.safeParseInt(
        document.querySelectorAll('.badge.topbar-launcherbadge')[0].firstChild
          .data,
      ),
    );
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
