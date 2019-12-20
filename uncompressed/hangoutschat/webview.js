"use strict";

module.exports = Franz => {
  const getMessages = function getMessages() {
    const muteSelector = '.DQy0Rb';
    let directCount = 0;
    document.querySelectorAll('.eM5l9e.FVKzAb').forEach(node => {
      if (!node.closest('content[role="listitem"]').querySelector(muteSelector)) {
        directCount += 1;
      }
    });
    let indirectCount = 0;
    document.querySelectorAll('.PL5Wwe.H7du2 .t5F5nf').forEach(node => {
      if (!node.closest('content[role="listitem"]').querySelector(muteSelector)) {
        indirectCount = +1;
      }
    });
    indirectCount -= directCount;
    Franz.setBadge(directCount, indirectCount);
  };

  document.addEventListener('click', e => {
    const {
      tagName,
      target,
      href
    } = e.target;

    if (tagName === 'A' && target === '_blank') {
      e.preventDefault();
      e.stopImmediatePropagation();
      window.open(href);
    }
  });
  Franz.loop(getMessages);
};