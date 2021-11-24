"use strict";

module.exports = Ferdi => {
  const getMessages = function getMessages() {
    // Initialize empty vars
    var unread = 0;
    var match = [];
    // Get value of <title> tag where in case of new messages the number of messages appear
    const titleValue = document.querySelector('title').text;
    // Extract the number from the tag
    match = titleValue.match(/\d+/);
    // Set unread msgs badge
    Ferdi.setBadge(Ferdi.safeParseInt(match[0]));
  };

  const loopFunc = () => {
    getMessages();
  };

  Ferdi.loop(loopFunc);

};
