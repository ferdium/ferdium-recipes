"use strict";

module.exports = Franz => {
  const getMessages = function getMessages() {
    const directMessages = document.querySelectorAll('.sidebar--left .has-badge .badge').length;
    const allMessages = document.querySelectorAll('.sidebar--left .has-badge').length - directMessages;
    const teamDirectMessages = document.querySelectorAll('.team-wrapper .team-container .badge').length;
    const teamMessages = document.querySelectorAll('.team-wrapper .unread').length - teamDirectMessages;
    Franz.setBadge(directMessages + teamDirectMessages, allMessages + teamMessages);
  };

  Franz.loop(getMessages);
};