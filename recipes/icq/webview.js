function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let directs = 0;
    const elements = document.querySelectorAll(
      '.nwa-msg-counter.icq-recent_state-read',
    );
    for (const element of elements) {
      if (
        Ferdium.safeParseInt(
          element.textContent && element.textContent.replaceAll(/[^\d.]/g, ''),
        ) > 0
      ) {
        directs += 1; // count 1 per channel with messages
      }
    }

    Ferdium.setBadge(directs);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
