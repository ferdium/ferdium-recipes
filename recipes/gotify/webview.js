function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    // #messages is the (always-present) list container, not the messages
    // themselves, so its presence alone can't be used as the badge count.
    // The "Delete All" button is disabled exactly when the list is empty,
    // so its disabled state tells us whether there are unread messages.
    const deleteAllButton = document.querySelector('#delete-all');
    const hasMessages = !!deleteAllButton && !deleteAllButton.disabled;

    Ferdium.setBadge(hasMessages ? 1 : 0);
  };

  Ferdium.loop(getMessages);
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
