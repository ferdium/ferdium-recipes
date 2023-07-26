function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  function getUnreadCount(eltClassName) {
    const elt = document.querySelectorAll(
      `#global_filters .${eltClassName} .unread_count`,
    )[0];
    return elt === null ? 0 : Ferdium.safeParseInt(elt.textContent);
  }

  const getMessages = () => {
    // All unread messages
    const unreadAll = getUnreadCount('top_left_all_messages');

    // Private messages
    const unreadPrivate = getUnreadCount('top_left_private_messages');

    // @ Mentions messages
    const unreadMentions = getUnreadCount('top_left_mentions');

    const directMessages = unreadPrivate + unreadMentions;
    const indirectMessages = unreadAll - directMessages;

    Ferdium.setBadge(directMessages, indirectMessages);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
