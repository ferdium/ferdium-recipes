function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const counter = document.querySelector('[data-test=simple-bar-item-counter-chat]');
    const unread = counter ? parseInt(counter.innerText, 10) || 0 : 0;
    Ferdium.setBadge(unread);
  };
  Ferdium.loop(getMessages);
  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
