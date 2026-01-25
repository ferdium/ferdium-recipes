function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  // Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  // ИСПРАВЛЕНИЕ: Перехват клика на ранней стадии (Capturing phase)
  document.addEventListener('click', (event) => {
    const target = event.target.closest('a');
    
    if (target && target.href) {
      const url = target.href;
  
      // Проверяем, является ли ссылка внешней (не относится к домену MAX)
      // Замените 'max.com' на реальный домен вашего мессенджера
      const isInternal = url.includes('max.ru') || url.startsWith('/');
  
      if (!isInternal) {
        event.preventDefault();
        event.stopPropagation();
  
        try {
          // Метод 1: Самый надежный для последних версий Ferdium
          window.open(url, '_blank', 'noreferrer');
        } catch (e) {
          // Метод 2: Если первый не сработал (fallback)
          if (typeof Ferdium.openNewWindow === 'function') {
            Ferdium.openNewWindow(url);
          }
        }
      }
    }
  }, true);
};


