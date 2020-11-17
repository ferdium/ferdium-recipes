"use strict";

module.exports = Franz => {
  const getMessages = function getMessages() {
    var homework = 0
    const upcomingAssignment = document.getElementsByClassName('hrUpcomingAssignmentGroup')
    if (upcomingAssignment.length != 0) {
      var i;
      for (i = 0; i < upcomingAssignment.length; i++) {
        homework += upcomingAssignment[i].childElementCount;
      }
    }
    Franz.setBadge(parseInt(homework, 10));
  };

  Franz.loop(getMessages);
};