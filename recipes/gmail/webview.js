function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  // if the user is on gmail's landing page, go to the login page.
  if (
    location.hostname === 'www.google.com' &&
    location.href.includes('gmail/about/')
  ) {
    location.href =
      'https://accounts.google.com/AccountChooser?service=mail&continue=https://mail.google.com/mail/';
  }

  const getMessages = () => {
    const mailChatMeetBadges = document.querySelectorAll('span.XU.aH6');

    const mailChatMeetCounts = [...mailChatMeetBadges].reduce(
      (acc, e) => Ferdium.safeParseInt(e.getInnerHTML()) + acc,
      0,
    );

    Ferdium.setBadge(mailChatMeetCounts);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
