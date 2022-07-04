const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    const selNotifications =  document.querySelector("div.tiktok-1b4xcc5-DivHeaderInboxContainer.e18kkhh40 > sup");
    const selDM = document.querySelector("div.tiktok-1ibfxbr-DivMessageIconContainer.e1nx07zo0 > sup");

    const countNotifications = (selNotifications != null) ? Ferdium.safeParseInt(selNotifications.outerText) : 0;
    const countDM = (selDM != null) ? Ferdium.safeParseInt(selDM.outerText) : 0;

    const count = countNotifications + countDM;

    Ferdium.setBadge(count);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
