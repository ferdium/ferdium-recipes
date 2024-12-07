function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Trilium => {
  Trilium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
