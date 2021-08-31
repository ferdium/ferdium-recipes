const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdi => {
  const getMessages = () => {
    const updates = Ferdi.safeParseInt(document.querySelector('i#sr-last-counter').textContent);
    let messages = 0;
    const elements = document.querySelectorAll('.chat-counter:not(.d-none)');
    for (let i = 0; i < elements.length; i++) {
      messages += Ferdi.safeParseInt(elements[i].textContent);
    }

    Ferdi.setBadge(messages, updates);
  };

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
