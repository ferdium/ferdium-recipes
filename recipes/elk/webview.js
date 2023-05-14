const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = (Ferdium) => {
  // Inject css
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  // Get notifications
  Ferdium.loop(() => {
    const notifications = document.querySelectorAll("[href$=notifications]").item(0);
    // Null if not present
    if (!notifications) {
      return;
    }
    // Assume first element contains the number of notifications
    let parsedValue = Ferdium.safeParseInt(notifications.outerText);
    // Set to parsed value
    Ferdium.setBadge(parsedValue);
  });
}
