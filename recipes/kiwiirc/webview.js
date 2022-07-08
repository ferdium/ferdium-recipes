const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = function getMessages() {
    // eslint-disable-next-line no-undef
    const unreadChannelsCount = kiwi.state.networks.reduce((count, network) => {
      return (count += network.buffers.filter(buffer => {
        return !buffer.name.startsWith('*') && buffer.flags.unread !== 0;
      }).length);
    }, 0);

    // eslint-disable-next-line no-undef
    const mentionedChannelsCount = kiwi.state.networks.reduce((count, network) => {
      return (count += network.buffers.filter(buffer => {
        return (
          !buffer.name.startsWith('*') &&
          buffer.flags.unread !== 0 &&
          buffer.flags.highlight
        );
      }).length);
    }, 0);

    // set Ferdium badges
    Ferdium.setBadge(mentionedChannelsCount, unreadChannelsCount);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
