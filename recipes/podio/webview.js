const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdi => {
  const getMessages = () => {
    const updates = document.querySelectorAll('.counter')[0].textContent;
    Ferdi.setBadge(updates, 0);
  };

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'css', 'franz.css'));
};
