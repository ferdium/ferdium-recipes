function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    // Google Chat publishes its unread total on the shortcut rail's
    // accessibility label, e.g. "Home shortcut, 3 unread messages", and drops
    // the number entirely when nothing is unread. The class and jsname
    // attributes around it are obfuscated and rotate, but data-shortcut-type
    // is stable: 1 is Home, which covers both direct messages and spaces.
    const home = document.querySelector('[data-shortcut-type="1"]');
    const label = home ? home.getAttribute('aria-label') : '';
    const unread = label ? label.match(/\d+/) : null;
    const count = unread ? Ferdium.safeParseInt(unread[0]) : 0;

    // set Ferdium badge
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
