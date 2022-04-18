const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdium => {
  Ferdium.injectCSS(_path.default.join(__dirname, 'calendar.css'));
  Ferdium.injectJSUnsafe(_path.default.join(__dirname, 'webview-unsafe.js'));
};
