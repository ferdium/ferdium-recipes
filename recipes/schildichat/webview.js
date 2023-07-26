function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  function getMessages() {
    const directMatches = document
      .querySelector('title')
      .textContent.match('(?<=\\[)\\d+(?=])');
    Ferdium.setBadge(
      Ferdium.safeParseInt(directMatches === null ? 0 : directMatches[0]),
      document
        .querySelector('.mx_SpaceTreeLevel')
        .querySelectorAll('.mx_NotificationBadge_dot').length,
    );
  }

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
