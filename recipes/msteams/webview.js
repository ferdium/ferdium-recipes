"use strict";

const path = require('path');

window.electronSafeIpc = {
  send: () => null,
  on: () => null
};
window.desktop = undefined;

module.exports = Franz => {
  const getMessages = () => {
    let messages = 0;
    const badge = document.querySelector('.activity-badge.dot-activity-badge .activity-badge');

    if (badge) {
      const value = parseInt(badge.innerHTML, 10);

      if (!isNaN(value)) {
        messages = value;
      }
    }
	const indirectMessages = document.querySelectorAll("[class*=channel-anchor][class*=ts-unread-channel]").length;

    Franz.setBadge(messages, indirectMessages);
  };

  Franz.injectCSS(path.join(__dirname, 'service.css'));
  Franz.loop(getMessages);
};
