const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  // TODO: If your onMail service has unread messages, uncomment these lines to implement the logic for updating the badges
  const getMessages = () => {
    let countImportant = 0;
    const inboxLinks = document.querySelectorAll('p.truncate');
    for (const label of inboxLinks){
      if (label.textContent) {
        countImportant = label.nextSibling.textContent;
        break;
      }
    }
    Ferdium.setBadge(countImportant, 0);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
