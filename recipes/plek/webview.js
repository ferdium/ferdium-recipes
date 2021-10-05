const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdi => {
  const getMessages = () => {
    let directMessages = 0;
    let indirectMessages = 0;

    const elements = document.querySelectorAll('.counter');
    for (const element of elements) {
      directMessages += Ferdi.safeParseInt(element.textContent);
    }

    const elements2 = document.querySelectorAll('.badge');
    for (const element of elements2) {
      indirectMessages += Ferdi.safeParseInt(element.textContent);
    }

    Ferdi.setBadge(directMessages, indirectMessages);
  };

  Ferdi.loop(getMessages);
  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
