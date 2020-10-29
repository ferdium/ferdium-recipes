"use strict";

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

module.exports = Franz => {
  const getMessages = function getMessages() {
    const direct = document.querySelectorAll(
      '.notifications .notification-container .notification-wrapper li .notification'
    ).length;

    Franz.setBadge(direct);
  };

  Franz.loop(getMessages);
};
