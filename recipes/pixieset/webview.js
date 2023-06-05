"use strict";

module.exports = (Ferdium) => {
  const getMessages = () => {
    const element = document.querySelector('.notification-count');
    Ferdium.setBadge(element ? Ferdium.safeParseInt(element.textContent.match(/\d+/)[0]) : 0);
  };

  Ferdium.loop(getMessages);
};
