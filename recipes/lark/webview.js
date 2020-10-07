const path = require('path');


module.exports = (Franz) => {
  const getMessages = function getMessages() {

    const ele = document.querySelectorAll('.larkc-badge-count.navbarMenu-badge');
    if (!ele.length) {
      Franz.setBadge(0);
      return;
    }
    const messages = parseInt(ele[0].innerHTML, 10);
    Franz.setBadge(messages);
  };

  Franz.injectCSS(path.join(__dirname, 'service.css'));
  Franz.loop(getMessages);
};
