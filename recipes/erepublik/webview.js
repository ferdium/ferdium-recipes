const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdi => {
  const getMessages = () => {
    const elementNotify = document.querySelectorAll('.notify');
    const elementFeed = document.querySelectorAll('.unreadCounter.ng-binding.ng-scope');

    let countNotify = 0;
    let countFeed = 0;

    for (const element of elementNotify) {
      const splitText = element.title.split(':');
      countNotify += Ferdi.safeParseInt(splitText[1]);
    }

    for (const element of elementFeed) {
      countFeed += Ferdi.safeParseInt(element.textContent);
    }

    Ferdi.setBadge(countNotify, countFeed);
  };

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
  Ferdi.injectCSS(_path.default.join(__dirname, 'crpk-resources/fonts.css'));
};
