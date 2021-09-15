var _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdi => {
  const getMessages = function getMessages() {
    const getNotificationButton = document.querySelector(
      '#notifications_button',
    );
    let hasNotification = getNotificationButton.classList.contains('pp-active');
    Ferdi.setBadge(0, hasNotification ? 1 : 0);
  };
  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
