const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (Ferdi) => {
  const getMessages = () => {
    let directMessages = 0;
    let indirectMessages = 0;

    const elements = document.querySelectorAll('.counter');
    for (let i = 0; i < elements.length; i += 1) {
      directMessages += Ferdi.safeParseInt(elements[i].innerText);
    }

    const elements2 = document.querySelectorAll('.badge');
    for (let i = 0; i < elements2.length; i += 1) {
      indirectMessages += Ferdi.safeParseInt(elements2[i].innerText);
    }

    Ferdi.setBadge(directMessages, indirectMessages);
  };

  Ferdi.loop(getMessages);
  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
