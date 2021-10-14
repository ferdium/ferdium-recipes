var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = (Ferdi) => {
  const getMessages = () => {
    const notificationBadge = document.querySelector(
      ".siteHeader__topLevelItem--profileIcon .headerPersonalNav .modalTrigger .headerPersonalNav__icon .headerPersonalNav__flag"
    );
    let notification = notificationBadge
      ? Number.parseInt(notificationBadge.textContent)
      : 0;

    Ferdi.setBadge(notification);
  };
  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, "service.css"));
};
