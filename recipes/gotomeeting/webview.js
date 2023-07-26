function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  if (document.location.href.match('after')) {
    document.location.href = 'https://app.gotomeeting.com/home.html';
  }
};
