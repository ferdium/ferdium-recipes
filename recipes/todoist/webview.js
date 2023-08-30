function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  function getTasks() {
    let todayCount = 0;
    let inboxCount = 0;
    const todayElement = document.querySelector(
      '#filter_today div div a + span div span',
    );
    const inboxElement = document.querySelector(
      '#filter_inbox div div a + span div span',
    );

    if (todayElement) {
      todayCount = Ferdium.safeParseInt(todayElement.textContent);
    }

    if (inboxElement) {
      inboxCount = Ferdium.safeParseInt(inboxElement.textContent);
    }

    Ferdium.setBadge(inboxCount, todayCount);
  }

  Ferdium.loop(getTasks);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
