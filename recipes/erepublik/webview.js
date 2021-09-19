const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdi => {
  const getMessages = () => {
    const elementNotify = document.getElementsByClassName('notify');
    const elementFeed = document.getElementsByClassName('unreadCounter ng-binding ng-scope');

    let countNotify = 0;
    let countFeed = 0;

    for (let i = 0; i < elementNotify.length; i++) {
      const splitText = elementNotify[i].title.split(':');
      countNotify += Ferdi.safeParseInt(splitText[1]);
    }

    for (let i = 0; i < elementFeed.length; i++) {
      countFeed += Ferdi.safeParseInt(elementFeed[i].textContent);
    }

    Ferdi.setBadge(countNotify, countFeed);
  };

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
  Ferdi.injectCSS(_path.default.join(__dirname, 'crpk-resources/fonts.css'));
};
