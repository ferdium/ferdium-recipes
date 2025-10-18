function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

// Variable to keep previous notification in
let previousNotification = null;

module.exports = Ferdium => {
  const getMessages = () => {
    let messages = 0;
    const badges = document.querySelectorAll(
      '.activity-badge.dot-activity-badge .activity-badge',
    );
    if (badges) {
      Array.prototype.forEach.call(badges, badge => {
        messages += Ferdium.safeParseInt(badge.textContent);
      });
    }

    const indirectMessages =
      document.querySelectorAll('.app-bar-mention').length;

    Ferdium.setBadge(messages, indirectMessages);
  };

  window.addEventListener('beforeunload', async () => {
    Ferdium.releaseServiceWorkers();
  });

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
  Ferdium.injectJSUnsafe(_path.default.join(__dirname, 'webview-unsafe.js'));

  // Function to handle the double notifications
  Ferdium.onNotify(notification => {
    // Turn off the need for clicking on the notification, for it to disappear
    notification.options.requireInteraction = false;

    if (previousNotification === null) {
      // Handle very first notification
      previousNotification = notification;

      return notification;
    }

    // Updating the previous notification variable
    previousNotification = notification;

    if (
        previousNotification.title === notification.title
        && previousNotification.options.body === notification.options.body
    ) {
      // The notification is the same as previous one, so we return null to ensure that it will not show
      return null;
    }

    return notification;
  });
};
