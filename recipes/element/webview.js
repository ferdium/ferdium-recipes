module.exports = Ferdi => {
  function getMessages() {
    const badges = document.querySelectorAll('.mx_RoomSublist:not(.mx_RoomSublist_hidden) .mx_RoomSublist_badgeContainer');

    // Number of messages from People
    let directCount = 0;
    if (badges.length > 0) {
      directCount = Ferdi.safeParseInt(badges[0].textContent);
    }

    // Number of messages from Rooms
    let indirectCount = 0;
    if (badges.length > 1) {
      indirectCount = Ferdi.safeParseInt(badges[1].textContent);
    }

    // set Ferdi badge
    Ferdi.setBadge(directCount, indirectCount);
  }

  Ferdi.loop(getMessages);
};
