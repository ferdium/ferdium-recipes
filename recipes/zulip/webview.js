function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  // Zulip (2024 on) keeps each count in a `.unread_count` child, empty at 0.
  // Every lookup is null-safe: an element Zulip renames gives 0, it does not
  // stop the other counts from reaching the badge.
  function countIn(selector) {
    const elt = document.querySelector(`${selector} .unread_count`);
    return elt == null ? 0 : Ferdium.safeParseInt(elt.textContent);
  }

  const getMessages = () => {
    // @ mentions
    const unreadMentions = countIn('.top_left_mentions');

    // Direct messages
    const unreadDirect = countIn('#direct-messages-section-header');

    // Everything unread in the home view, direct messages included
    const unreadAll = countIn('.top_left_condensed_unread_marker');

    Ferdium.setBadge(
      unreadDirect + unreadMentions,
      Math.max(unreadAll - unreadDirect, 0),
    );
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
