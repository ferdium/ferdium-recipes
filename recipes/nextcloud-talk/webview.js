const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdium => {
  const getMessages = () => {
    let direct = 0;
    const notificationWrapper = document.querySelector(
      '.notifications .notification-wrapper',
    );

    if (notificationWrapper) {
      direct = notificationWrapper.querySelectorAll(
        '.notification[object_type="chat"], .notification[object_type="room"',
      ).length;
    }

    let indirect = 0;

    for (const counter of document.querySelectorAll('.app-navigation-entry__counter')) {
        indirect += Number(counter.textContent);
      }

    if (document.title.startsWith("*")) {
      indirect++;
    }

    Ferdium.setBadge(direct, indirect);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
