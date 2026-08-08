function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const count = Ferdium.safeParseInt(
      document.querySelector(
        'a[data-test-folder-name="Inbox"] span[data-test-id="displayed-count"], [data-test-id="menu-list-item"]:has([aria-label="Inbox"], [aria-label="Selected, Inbox"]) [data-test-id="badge"] > span',
      )?.textContent,
    );
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
