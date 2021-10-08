var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = (Ferdi) => {
  const getMessages = () => {
    const hasNotifications = document.querySelector(".counterBadge");

    Ferdi.setBadge(0, hasNotifications ? 1 : 0);
  };
  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, "service.css"));
};
