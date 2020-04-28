"use strict";

module.exports = Franz => {
  const getMessages = function getMessages() {
    var unread = 0
    const notificationBadge = document.getElementsByClassName('tab-red-dot').length;
    Franz.setBadge(unread);
  };

  Franz.loop(getMessages);
};
