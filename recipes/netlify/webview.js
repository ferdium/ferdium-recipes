var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = (Ferdi) => {
  const getMessages = () => {
    const notifications = document.querySelectorAll("circle");

    Ferdi.setBadge(0, notifications.length > 0 ? 1 : 0);
  };
  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, "service.css"));
};
