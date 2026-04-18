function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  // TODO: If your Stoat service has unread messages, uncomment these lines to implement the logic for updating the badges
  // const getMessages = () => {
  //   // TODO: Insert your notification-finding code here
  //   Ferdium.setBadge(0, 0);
  // };
  // Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
