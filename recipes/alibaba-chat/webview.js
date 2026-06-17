function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
      const unreadText = document.querySelector(
        '.inbox-list-container .panel-content .option-item:last-child .item-unread-num',
      )?.textContent?.trim() ?? '';

      const unreadCount =
        Number.parseInt(unreadText.replace(/[^\d]/g, ''), 10) || 0;

      Ferdium.setBadge(unreadCount, 0);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
