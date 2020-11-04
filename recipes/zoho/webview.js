const path = require('path');

module.exports = (Franz, options) => {
  const getMessages = () => {
    const unreadMail = $(".zmList.zmLUrd").length;

    Franz.setBadge(unreadMail);
  }

  Franz.loop(getMessages);
};