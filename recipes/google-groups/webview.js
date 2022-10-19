const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    let countImportant = 0;
    const unReadConversationCount = document.querySelectorAll('.NHlkZc');
    if (unReadConversationCount.length > 0) {
      countImportant = Ferdium.safeParseInt(unReadConversationCount[0].textContent);
    }
    Ferdium.setBadge(countImportant, 0);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
