const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
    const getMessages = () => {
      let direct = 0;
      let indirect = 0;
      const elements = document.querySelectorAll('.rp');
      for (const element of elements) {
        const subtitleBadge = element.querySelector('.dialog-subtitle-badge');
        if (subtitleBadge) {
          const parsedValue = Ferdium.safeParseInt(subtitleBadge.textContent);
          if (element.dataset.peerId > 0) {
            direct += parsedValue;
          } else {
            indirect += parsedValue;
          }
        }
      }
  
      Ferdium.setBadge(direct, indirect);
    };
  
    const getActiveDialogTitle = () => {
      const element = document.querySelector('.top .peer-title');
  
      Ferdium.setDialogTitle(element ? element.textContent : '');
    };
  
    const loopFunc = () => {
      getMessages();
      getActiveDialogTitle();
    };
  
    Ferdium.loop(loopFunc);
  
    Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};