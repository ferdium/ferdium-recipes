const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdium => {
  const getMessages = () => {
    const direct = document.querySelectorAll(
      '.app-navigation-entry-utils-counter.highlighted',
    ).length;
    const indirect = document.querySelectorAll(
      '.app-navigation-entry-utils-counter:not(.highlighted)',
    ).length;

    Ferdium.setBadge(direct, indirect);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
