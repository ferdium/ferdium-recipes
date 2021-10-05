const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdi => {
  const getMessages = () => {
    const ele = document.querySelectorAll(
      '.larkc-badge-count.navbarMenu-badge',
    );
    if (ele.length === 0) {
      Ferdi.setBadge(0);
      return;
    }
    Ferdi.setBadge(ele[0].textContent);
  };

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
