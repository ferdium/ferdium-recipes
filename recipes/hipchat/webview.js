function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const directMessages = document.querySelectorAll('.hc-mention').length;
    const allMessages =
      document.querySelectorAll('.aui-badge:not(.hc-mention)').length -
      directMessages;

    // set Ferdium badge
    Ferdium.setBadge(directMessages, allMessages);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
