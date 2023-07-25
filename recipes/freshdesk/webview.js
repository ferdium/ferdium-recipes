function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    $.get('/api/_/tickets?filter=unresolved', data => {
      Ferdium.setBadge(data.tickets.length);
    });
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  /* block popups (prevents freshconnect from opening in a new window) */
  // eslint-disable-next-line func-names
  window.open = function (_url, _name) {
    // console.log(`blocked window.open(${url}, ${name})`);
  };
};
