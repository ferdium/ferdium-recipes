const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (Ferdium) => {
  const getMessages = () => {
    const inbox = document.querySelector('.topbar-notificationsButton.has-newNotifications');
    const passiveCount = inbox === null ? 0 : 1;
    Ferdium.setBadge(0, passiveCount);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'css', 'franz.css'));
};
