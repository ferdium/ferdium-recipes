'use strict';

module.exports = (Franz, options) => {
  function getMessages() {
    let directCount = 0;
    let element = document.querySelector('span.notification-indicator');

    if (element && element.innerText) {
      directCount = parseInt(element.innerText);
    }

    Franz.setBadge(directCount);
  }

  Franz.loop(getMessages);
}
