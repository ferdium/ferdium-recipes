//const path = require('path');

module.exports = Ferdium => {
  const getMessages = () => {
    const directMessages = $(
      '.notification-item.col-xs-12.clearfix.unread',
    )?.length;

    Ferdium.setBadge(directMessages);
  };

  Ferdium.loop(getMessages);
};
