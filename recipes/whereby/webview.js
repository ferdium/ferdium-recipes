var _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdium => {
  const getMessages = () => {
    const elements = document.querySelectorAll('.CxUIE, .unread');
    let count = 0;

    for (const element of elements) {
      if (element.querySelectorAll('*[data-icon="muted"]').length === 0) {
        count += 1;
      }
    }

    // set Ferdium badge
    Ferdium.setBadge(count);
  };

  // check for new messages every second and update Ferdium badge
  Ferdium.loop(getMessages);

  // inject Ferdium.css stylesheet
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
