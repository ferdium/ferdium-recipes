const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    // get unread messages
    let directCount = 0;
    for (const node of document.querySelectorAll('div.unread-indicator')) {
      directCount += Ferdium.safeParseInt(node.textContent);
    }

    const channelMentionCount =
      document.querySelectorAll('.mention-indicator').length;

    // set Ferdium badge
    Ferdium.setBadge(directCount, channelMentionCount);
  };

  Ferdium.loop(getMessages);

  // Hide download message
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
