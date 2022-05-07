const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdium => {
  const getMessages = () => {
    const updates = Ferdium.safeParseInt(document.querySelector('i#sr-last-counter').textContent);
    let messages = 0;
    const elements = document.querySelectorAll('.chat-counter:not(.d-none)');
    for (const element of elements) {
      messages += Ferdium.safeParseInt(element.textContent);
    }

    Ferdium.setBadge(messages, updates);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
