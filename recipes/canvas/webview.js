"use strict";

module.exports = Ferdi => {
  const getMessages = () => {
    var direct = 0;

    const MessageElement = document.querySelector('[id=global_nav_conversations_link]');
    if (MessageElement) {
      direct += MessageElement.innerHTML;
    }
    
    Ferdi.setBadge(direct);
  };

  Ferdi.loop(getMessages);

};