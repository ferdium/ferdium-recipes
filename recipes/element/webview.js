module.exports = Ferdium => {
  function getMessages() {
    // const badges = document.querySelectorAll('.mx_RoomSublist:not(.mx_RoomSublist_hidden) .mx_RoomSublist_badgeContainer');
    const spaceBadges = document.querySelectorAll('.mx_SpacePanel_badgeContainer .mx_NotificationBadge .mx_NotificationBadge_count');
    const avatarBadges = document.querySelectorAll('.mx_DecoratedRoomAvatar .mx_NotificationBadge .mx_NotificationBadge_count');
    // Number of messages from People / Number of messages appearing Red in the Room List
    let directCount = 0;
    // Number of messages from Rooms / Number of messages appearing Grey in the Room List
    let indirectCount = 0;
    // Count Badges depending on Element Settings
    if (avatarBadges.length > 0) {
      for (const badge of avatarBadges) {
        if (badge.parentElement.getAttribute('class').includes('mx_NotificationBadge_highlighted')) {
          directCount = directCount + Ferdium.safeParseInt(badge.textContent);
        } else if (badge.parentElement.previousSibling != null && badge.parentElement.previousSibling.getAttribute('class').includes('mx_DecoratedRoomAvatar_icon_online')) {
          directCount = directCount + Ferdium.safeParseInt(badge.textContent);
        } else if (badge.parentElement.getAttribute('class').includes('mx_NotificationBadge_dot')) {
          indirectCount = indirectCount + 1; // there might be dragons: incrementing does not work here?
        } else {
          indirectCount = indirectCount + Ferdium.safeParseInt(badge.textContent);
        }
      }
    } else {
      for (const badge of spaceBadges) {
        if (badge.parentElement.getAttribute('class').includes('mx_NotificationBadge_highlighted')) {
          directCount = directCount + Ferdium.safeParseInt(badge.textContent);
        } else if (badge.parentElement.getAttribute('class').includes('mx_NotificationBadge_dot')) {
          indirectCount = indirectCount + Ferdium.safeParseInt(1); // there might be dragons: incrementing does not work here?
        } else {
          indirectCount = indirectCount + Ferdium.safeParseInt(badge.textContent);
        }
      }
    }
    // set Ferdium badge
    Ferdium.setBadge(directCount, indirectCount);
  }
  Ferdium.loop(getMessages);
};
