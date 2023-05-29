const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    const elements = document.querySelectorAll(
      'div#chat_list > ul#chat_grp_lst > li#item_chat > dl#chat_count > span#new',
    );
    let count = elements[0] ? count = Ferdium.safeParseInt(elements[0].textContent): 0;

    Ferdium.setBadge(count);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
}
