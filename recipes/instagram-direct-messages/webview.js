function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

setInterval(() => {
  document.querySelector('._lz6s.Hz2lF').style.display = 'none';
  document.querySelector('.t30g8.L1C6I').style.paddingTop = 0;
  document.querySelector('.i0EQd').style.maxWidth = 'unset !important';
}, 3000);

module.exports = Ferdium => {
  const getMessages = () => {
    const element = document.querySelector('a[href^="/direct/inbox"] span');
    Ferdium.setBadge(
      element.textContent ? Ferdium.safeParseInt(element.textContent) : 0,
    );
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
