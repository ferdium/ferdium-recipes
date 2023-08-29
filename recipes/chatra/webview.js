function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    // get new conversations in My Queue
    const myQueue = $(
      '.super-nav a.super-nav__item.js-from-super-to-nav[href^="/chat/box:my"] .count',
    )
      .not('.count--gray')
      .text();

    // get all missed conversations
    const missed = $(
      '.super-nav a.super-nav__item.js-from-super-to-nav[href^="/chat/box:missed"] .count',
    ).text();

    // set Ferdium badge
    // myQueue => New conversations in My Queue
    // missed => All missed conversations
    Ferdium.setBadge(myQueue, missed);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
