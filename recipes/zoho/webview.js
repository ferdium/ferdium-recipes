const path = require('path');

module.exports = (Franz, options) => {
  const getMessages = () => {
    const unreadMail = $("#zmlTree .zmTreeNDWra .zmBold").length;

    Franz.setBadge(unreadMail);
  }

  Franz.loop(getMessages);
};
