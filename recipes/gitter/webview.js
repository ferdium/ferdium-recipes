const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdi => {
  const getMessages = () => {
    // get unread messages
    let count = 0;
    document.querySelectorAll('div.unread-indicator').forEach((node) => {
      count += Ferdi.safeParseInt(node.innerText);
    });

    // set Ferdi badge
    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);

  // Hide download message
  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
