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
        'gv-nav-tab[tooltip="Messages"] div[aria-label="Unread count"]',
      );
      const countCalls = parseQuery(
        'gv-nav-tab[tooltip="Calls"] div[aria-label="Unread count"]',
      );
      const countVoicemails = parseQuery(
        'gv-nav-tab[tooltip="Voicemail"] div[aria-label="Unread count"]',
      );
      count = countMessages + countCalls + countVoicemails;
    }

    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
