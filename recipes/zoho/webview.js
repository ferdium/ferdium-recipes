const path = require('path');

module.exports = (Franz, options) => {
  const getMessages = () => {
    const unreadMailInCurrentFolder = $('.zmList.zmLUrd').length;
    const unreadMailAnyware = $('#zmlTree .zmTreeNDWra .zmBold').length;

    Franz.setBadge(unreadMailInCurrentFolder, unreadMailAnyware);
  };

  Franz.loop(getMessages);
};
