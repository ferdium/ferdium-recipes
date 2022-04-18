const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdium => {
  const getMessages = () => {
    const hasNotification = document.querySelectorAll('.SidebarTopNavLinks-notificationsButton--hasNewNotifications');
    Ferdium.setBadge(hasNotification.length > 0 ? 1 : 0);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
