module.exports = (Ferdi) => {
  const getMessages = () => {
    let directCount = 0;
    let indirectCount = 0;
    const roomInfoContainer = document.querySelectorAll('li.sc-dnqmqq');
    Array.prototype.forEach.call(roomInfoContainer, (room) => {
      let count = 0;
      const unreadBadge = room.querySelector('span.sc-kAzzGY');
      const unreadBadgeHasMention = room.querySelector('li._unreadBadge.sc-cSHVUG');

      if (unreadBadge && unreadBadge.innerText) {
        count = Ferdi.safeParseInt(unreadBadge.innerText);
      }

      if (count > 0) {
        if (room.querySelector('img.sc-gqjmRU').getAttribute('src').indexOf('avatar') < 0) {
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
    Ferdi.setBadge(directCount, indirectCount);
  }

  Ferdi.loop(getMessages);
};
