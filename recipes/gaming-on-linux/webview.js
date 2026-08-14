function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  function getNotificationCount() {
    let notifications = document.querySelector(
      '#normal_notifications > a:nth-child(1) > span',
    ).innerHTML;
    return Ferdium.safeParseInt(notifications);
  }

  function getMessageCount() {
    let messages = document.querySelector('#pm_counter').innerHTML;
    return Ferdium.safeParseInt(messages);
  }

  const updateMessageCount = () => {
    let count = getNotificationCount() + getMessageCount();
    Ferdium.setBadge(count);
  };

  const loopRoutine = () => {
    updateMessageCount();
  };

  Ferdium.loop(loopRoutine);
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
