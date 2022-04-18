const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    const ele = document.querySelectorAll(
      '.larkc-badge-count.navbarMenu-badge',
    );
    if (ele.length === 0) {
      Ferdium.setBadge(0);
      return;
    }
    Ferdium.setBadge(ele[0].textContent);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
