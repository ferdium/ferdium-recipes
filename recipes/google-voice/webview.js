function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  function parseQuery(query) {
    const el = document.querySelector(query);
    return el && Ferdium.safeParseInt(el.textContent);
  }

  const getMessages = () => {
    const el = document.querySelector('.msgCount');
    let count;

    if (el && el.textContent) {
      count = Ferdium.safeParseInt(el.textContent.replaceAll(/[ ()]/gi, ''));
    } else {
      const countMessages = parseQuery(
        'mat-nav-list a[gv-test-id="sidenav-messages"] span.navItemBadge',
      );
      const countCalls = parseQuery(
        'mat-nav-list a[gv-test-id="sidenav-calls"] span.navItemBadge',
      );
      const countVoicemails = parseQuery(
        'mat-nav-list a[gv-test-id="sidenav-voicemail"] span.navItemBadge',
      );
      count = countMessages + countCalls + countVoicemails;
    }

    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
