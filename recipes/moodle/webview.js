var _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdi => {
  const getMessages = () => {
    const elements = [...document.querySelectorAll('[data-region="count-container"]')];
    const messages = elements.reduce(
      ((count, item) => count + Number(item.textContent)),
      0
    );

    Ferdi.setBadge(messages, 0);
  };
  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
