module.exports = Ferdium => {
  function getMessages() {
    const badges = document.querySelectorAll('.mx_RoomList .mx_RoomSublist_tiles .mx_NotificationBadge');
    // Number of messages from rooms which has "All Messages" notifications enabled.
    // Always incremented for private rooms by default, incremented for group chats if
    // "All Messages" is selected for them in notifications settings.
    let directCount = 0;
    // Number of messages for rooms which has "Only Highlights" notifications level set.
    // Appears in rooms list with dots on right.
    let indirectCount = 0;
    
    for (const badge of badges) {
      if (badge.classList.contains('mx_NotificationBadge_dot')) {
        indirectCount++;
      } else {
        directCount += Ferdium.safeParseInt(badge.childNodes[0].textContent);
      }
    }

    // set Ferdium badge
    Ferdium.setBadge(directCount, indirectCount);
  }
  Ferdium.loop(getMessages);
};

