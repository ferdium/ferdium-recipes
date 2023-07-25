function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const selNotifications = document.querySelector(
      'div.tiktok-1b4xcc5-DivHeaderInboxContainer.e18kkhh40 > sup',
    );
    const selDM = document.querySelector(
      'div.tiktok-1ibfxbr-DivMessageIconContainer.e1nx07zo0 > sup',
    );

    const countNotifications =
      selNotifications === null
        ? 0
        : Ferdium.safeParseInt(selNotifications.outerText);
    const countDM = selDM === null ? 0 : Ferdium.safeParseInt(selDM.outerText);

    const count = countNotifications + countDM;

    Ferdium.setBadge(count);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
