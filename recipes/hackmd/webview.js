const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (Ferdium) => {
  const getMessages = () => {
    // get unread messages
    const count = document.querySelectorAll('.guilds-wrapper .badge').length;

    // set Ferdium badge
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);

  // Hide download message
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
