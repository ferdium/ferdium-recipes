function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  // TODO: If your hubstaff service has unread messages, uncomment these lines to implement the logic for updating the badges
  const getMessages = () => {
    // TODO: Insert your notification-finding code here
    let directMessages = 0;
    let indirectMessages = 0;
    const notificationContainers = document.querySelectorAll(
      '.notifications-number',
    );
    if (notificationContainers) {
      directMessages = Ferdium.safeParseInt(
        notificationContainers[0].textContent,
      );
      indirectMessages = Ferdium.safeParseInt(
        notificationContainers[1].textContent,
      );
    }
    Ferdium.setBadge(directMessages, indirectMessages);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
