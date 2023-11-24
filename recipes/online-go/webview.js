function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const games = document.querySelector('.TurnIndicator');
    const chat_messages = document.querySelector('.ChatIndicator .count');
    const notifications = document.querySelector(
      '.NotificationIndicator .count',
    );
    const indirect =
      Number.parseInt(notifications.textContent) +
      Number.parseInt(chat_messages.textContent);
    const direct = Number.parseInt(games.textContent);
    Ferdium.setBadge(direct, indirect);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
