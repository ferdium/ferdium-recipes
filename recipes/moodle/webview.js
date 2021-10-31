var _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdi => {
  const getMessages = () => {
    const directCountSelector = [...document.querySelectorAll('[data-region="count-container"]')];
    const totalMessageCount = directCountSelector.reduce(
      ((count, item) => count + Number(item.textContent)),
      0
    );

    Ferdi.setBadge(totalMessageCount, 0);
  };
  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
