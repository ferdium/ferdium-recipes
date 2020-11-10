"use strict";

module.exports = (Franz) => {
  const getMessages = () => {
    let count = 0;
    let element = document.querySelector(".message-count");
    if (element) {
      count = Number(element.innerText);
      if (Number.isNaN(count)) {
        count = 0;
      }
    }
    Franz.setBadge(count);
  };

  Franz.loop(getMessages);
};
