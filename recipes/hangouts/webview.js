function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    // Google Chat puts the unread total on the shortcut rail's accessibility
    // label, e.g. "Home shortcut, 3 unread messages", and drops the number
    // when nothing is unread. The classes and jsnames around it rotate, but
    // data-shortcut-type is stable: 1 is Home, covering both DMs and spaces.
    const homeElement = document.querySelector('[data-shortcut-type="1"]');
    const label = homeElement?.getAttribute('aria-label');
    let count;

    if (label) {
      const match = label.match(/\d+/);
      count = match ? Ferdium.safeParseInt(match[0]) : 0;
    } else {
      // No rail to read from: count the rendered rows instead. That
      // undercounts, since the roster is virtualised, but beats reporting zero.
      count = document.querySelectorAll('span[data-is-unread="true"]').length;
    }

    // set Ferdium badge
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
