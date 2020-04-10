"use strict";

module.exports = Franz => {
  const getMessages = function getMessages() {
    const unread = document.getElementsByClassName('notification-badge')[0].innerText;
    Franz.setBadge(parseInt(unread, 10));
  };

  Franz.loop(getMessages);
};