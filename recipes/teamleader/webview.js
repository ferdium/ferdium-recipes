function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let notifications = 0;
    let indirectNotifications = 0;

    const notificationElement = document.querySelector('#notifications_amount');
    const ticketElement = document.querySelector(
      "a[href='tickets.php'] > span",
    );
    const callElement = document.querySelector('#queue_amount');

    if (notificationElement) {
      notifications = Ferdium.safeParseInt(
        notificationElement.getAttribute('datacount'),
      );
    }

    if (ticketElement !== null) {
      indirectNotifications = Ferdium.safeParseInt(ticketElement.textContent);
    }

    if (callElement) {
      indirectNotifications += Ferdium.safeParseInt(
        callElement.getAttribute('datacount'),
      );
    }

    Ferdium.setBadge(notifications, indirectNotifications);
  };

  Ferdium.loop(getMessages);
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
