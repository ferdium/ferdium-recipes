const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (Ferdi) => {
  const getMessages = function getMessages() {
    let notifications = 0;
    let indirectNotifications = 0;

    const notification_element = document.getElementById('notifications_amount');
    const ticket_element = document.querySelector("a[href='tickets.php'] > span");
    const call_element = document.getElementById('queue_amount');

    if (notification_element) {
        notifications = Ferdi.safeParseInt(notification_element.getAttribute("datacount"));
    }

    if (ticket_element != null) {
      indirectNotifications = Ferdi.safeParseInt(ticket_element.innerHTML);
    }

    if (call_element) {
      indirectNotifications += Ferdi.safeParseInt(call_element.getAttribute("datacount"));
    }

    Ferdi.setBadge(notifications, indirectNotifications);
  };

  Ferdi.loop(getMessages);
  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
