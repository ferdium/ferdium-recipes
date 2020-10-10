"use strict";

let getInnerInt = selector => {
  const element = document.querySelector(selector);
  return element && parseInt(element.innerText);
}

module.exports = Ferdi => {
  const getMessages = function getMessages() {
    let direct = (
      getInnerInt("#app button[data-test-id='notificationsCount']") || 0
    );

    Ferdi.setBadge(direct);
  };

  Ferdi.loop(getMessages);
};
