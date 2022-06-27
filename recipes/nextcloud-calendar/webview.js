const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    const directSelector = document.querySelectorAll(
      '.notifications .notification-wrapper .notification[object_type="dav"]',
    );
    const direct = directSelector ? Ferdium.safeParseInt(directSelector.length) : 0;

    Ferdium.setBadge(direct);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
