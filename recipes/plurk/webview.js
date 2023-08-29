function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let direct = 0;

    const np = document.querySelector('#noti_np_count');
    const re = document.querySelector('#noti_re_count');

    if (np) {
      direct += Ferdium.safeParseInt(np.textContent);
    }
    if (re) {
      direct += Ferdium.safeParseInt(re.textContent);
    }

    Ferdium.setBadge(direct);
  };

  Ferdium.loop(getMessages, 10_000);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
