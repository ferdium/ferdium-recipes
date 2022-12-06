module.exports = Ferdium => {
  function getMessages() {
    let directCount = 0;
    const spacesBar = document.querySelector('.mx_SpaceTreeLevel');
    spacesBar.querySelectorAll('.mx_NotificationBadge_count').forEach((badge) => {
      directCount += Ferdium.safeParseInt(badge.textContent);
    });
    const indirectCount = spacesBar.querySelectorAll('.mx_NotificationBadge_dot')
      .length;
    Ferdium.setBadge(directCount, indirectCount);
  }

  Ferdium.loop(getMessages);
};
