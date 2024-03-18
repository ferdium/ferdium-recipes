function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  // TODO: If your SNAME service has unread messages, uncomment these lines to implement the logic for updating the badges
  const getMessages = () => {
    // TODO: Insert your notification-finding code here
    const count = document.querySelector(
      '#im-list > div > div.im-conversation-list-container > div.im-next-tabs.im-next-tabs-pure.im-next-tabs-scrollable.im-next-medium.list-tab > div.im-next-tabs-bar > div > div > div > ul > li:nth-child(2) > div > div > span.red-num',
    );
    Ferdium.setBadge(count, 0);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
