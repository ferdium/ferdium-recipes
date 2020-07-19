'use strict';

module.exports = Franz => {
  function getMessages() {
    const indirect_badge = document.getElementsByClassName('mx_RoomSubList_badge');
    let indirect_count = 0;
    if (indirect_badge.length !== 0) {
      indirect_count = indirect_badge.length;
    }

    const direct_badge = document.getElementsByClassName('mx_RoomSubList_badgeHighlight');
    let direct_count = 0;
    if (direct_badge.length !== 0) {
      direct_count = direct_badge.length;
    }
    // set Franz badge
    Franz.setBadge(direct_count, indirect_count);
  }

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
