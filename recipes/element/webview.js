module.exports = Ferdium => {
  function getMessages() {
    const matches = document
      .querySelector('title')
      .textContent.match('(?<=\\[)\\d+(?=])');
    const directCount = Ferdium.safeParseInt(matches === null ? 0 : matches[0]);
    const indirectCount = document
      .querySelector('.mx_SpaceTreeLevel')
      .querySelectorAll('.mx_NotificationBadge_dot').length;
    Ferdium.setBadge(directCount, indirectCount);
  }

  Ferdium.loop(getMessages);
};
