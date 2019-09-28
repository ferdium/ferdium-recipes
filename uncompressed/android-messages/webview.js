"use strict";

module.exports = Franz => {
  function getMessages() {
    const messages = document.querySelectorAll('.text-content.unread').length;
    Franz.setBadge(messages);
  }

  Franz.loop(getMessages);
};