module.exports = Ferdium => {
  const getMessages = () => {
    let directCount = 0;
    let indirectCount = 0;
    const roomInfoContainer = document.querySelectorAll('li.sc-dnqmqq');
    Array.prototype.forEach.call(roomInfoContainer, room => {
      let count = 0;
      const unreadBadge = room.querySelector('span.sc-kAzzGY');
      const unreadBadgeHasMention = room.querySelector(
        'li._unreadBadge.sc-cSHVUG',
      );

      if (unreadBadge && unreadBadge.textContent) {
        count = Ferdium.safeParseInt(unreadBadge.textContent);
      }

      if (count > 0) {
        if (
          !room
            .querySelector('img.sc-gqjmRU')
            .getAttribute('src')
            .includes('avatar')
        ) {
          if (unreadBadgeHasMention) {
            directCount++;
          } else {
            indirectCount++;
          }
        } else {
          directCount++;
        }
      }
    });
    Ferdium.setBadge(directCount, indirectCount);
  };

  Ferdium.loop(getMessages);
};
