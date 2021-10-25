const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdi => {
  const getMessages = () => {
    // get unread messages
    let directCount = 0;
    for (const node of document.querySelectorAll('div.unread-indicator')) {
      directCount += Ferdi.safeParseInt(node.textContent);
    }

    const channelMentionCount =
      document.querySelectorAll('.mention-indicator').length;

    // set Ferdi badge
    Ferdi.setBadge(directCount, channelMentionCount);
  };

  Ferdi.loop(getMessages);

  // Hide download message
  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
