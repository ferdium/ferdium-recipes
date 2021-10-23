// Code copied from: https://gitlab.com/gortega4/ferdi_recipes

const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdi => {
  const getMessages = () => {
    let direct = 0;
    let indirect = 0;
    const elements = document.querySelectorAll('.rp');
    for (const element of elements) {
      const subtitleBadge = element.querySelector('.dialog-subtitle-badge');
      if (subtitleBadge) {
        const parsedValue = Ferdi.safeParseInt(subtitleBadge.textContent);
        if (element.dataset.peerId > 0) {
          direct += parsedValue;
        } else {
          indirect += parsedValue;
        }
      }
    }

    Ferdi.setBadge(direct, indirect);
  };

  const getActiveDialogTitle = () => {
    const element = document.querySelector('.top .peer-title');

    Ferdi.setDialogTitle(element ? element.textContent : '');
  };

  const loopFunc = () => {
    getMessages();
    getActiveDialogTitle();
  };

  Ferdi.loop(loopFunc);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
