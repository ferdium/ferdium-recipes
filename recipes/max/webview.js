function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {

  document.addEventListener('click', (event) => {
    const target = event.target.closest('a');

    if (target && target.href) {
      const url = target.href;

      const isInternal = url.includes('max.ru') || url.startsWith('/');

      if (!isInternal) {
        event.preventDefault();
        event.stopPropagation();

        try {
          window.open(url, '_blank', 'noreferrer');
        } catch (e) {
          if (typeof Ferdium.openNewWindow === 'function') {
            Ferdium.openNewWindow(url);
          }
        }
      }
    }
  }, true);
};


