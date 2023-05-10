module.exports = (Ferdium) => {
  const path = require('path');

  // Inject css
  Ferdium.injectCSS(path.default.join(__dirname, 'service.css'));

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
