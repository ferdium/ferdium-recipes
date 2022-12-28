module.exports = Ferdium => {
  function getMessages() {
    let directCount = 0;
    const spacesBar = document.querySelector('.mx_SpaceTreeLevel');

    for (const badge of spacesBar.querySelectorAll(
      '.mx_SpaceItem:not(.mx_SpaceItem_narrow):first-of-type .mx_NotificationBadge_count, '
        + '.mx_SpaceItem_narrow .mx_NotificationBadge_count'
    )) {
      const badgeContent = badge.textContent.toLowerCase();
      directCount += badgeContent.endsWith('k')
        ? Number.parseFloat(badgeContent) * 1000 + Number.parseInt(
          '5'.padEnd(Number.parseInt(badgeContent, 10).toString().length + 1, 0),
          10
        )
        : Ferdium.safeParseInt(badgeContent)
    }

    const indirectCount = spacesBar.querySelectorAll('.mx_NotificationBadge_dot')
      .length;
    Ferdium.setBadge(directCount, indirectCount);
  }

  Ferdium.loop(getMessages);
};
