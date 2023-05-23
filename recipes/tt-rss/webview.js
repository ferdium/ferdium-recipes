"use strict";

module.exports = Ferdium => {
  const _notificationCategory = new URL(window.location.href).searchParams.get("ferdiumNotificationCategory");
  
  const getMessages = function getMessages() {
    if (_notificationCategory) {
      countMessagesUnderCategory(_notificationCategory);
    } else {
      countMessages();
    }
  };

  const countMessagesUnderCategory = (notificationCategory) => {
    var elements = document.querySelectorAll(".dijitTreeIsRoot")
    var directMessages = 0;
    var indirectMessages = 0;
    for (var element of elements) {
      var label = element.querySelectorAll(".dijitTreeLabel")[0];
      var unreadNode = element.querySelectorAll(".unread")[0];
      var unreadAmount = Ferdium.safeParseInt(unreadNode.textContent);
      if (label.textContent === notificationCategory) {
        directMessages += unreadAmount;
      } else {
        indirectMessages += unreadAmount;
      }
    }
    Ferdium.setBadge(directMessages, indirectMessages);
  };

  const _countMessagesFromTitle = () => {
    var match = document.title.match(/^\((\d+)\) Tiny Tiny RSS$/);
    var count = match != null && match.length > 0 ? match[1] : 0;
    return Ferdium.safeParseInt(count);
  }

  const countMessages = () => {
    Ferdium.setBadge(_countMessagesFromTitle());
  };

  const loopFunc = () => {
    getMessages();
  };

  Ferdium.loop(loopFunc);
};
