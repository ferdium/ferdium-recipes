"use strict";

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdi => {
  const getMessages = function getMessages() {
    const unread = document.querySelectorAll('.header__bell-wrapper_unread');
    Ferdi.setBadge(unread.length>0 ? 1 : 0);
  };

  Ferdi.loop(getMessages);
};
