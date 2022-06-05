module.exports = Ferdi => {
    const getMessages = () => {
      let count = document.querySelector('.mx_RoomSubList_badge').innerHTML
      Ferdi.setBadge(count);
    };

    Ferdi.loop(getMessages);
  };