const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdium => {
  const getMessages = () => {
    const directSelector = document.querySelectorAll(
      '.app-navigation-entry-utils-counter.highlighted',
    );
    const direct = directSelector ? Ferdium.safeParseInt(directSelector.length) : 0;

    const indirectSelector = document.querySelectorAll(
      '.app-navigation-entry-utils-counter:not(.highlighted)',
    );
    const indirect = indirectSelector ? Ferdium.safeParseInt(indirectSelector.length) : 0;

    Ferdium.setBadge(direct, indirect);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
