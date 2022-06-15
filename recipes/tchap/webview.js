module.exports = Ferdium => {
  const getMessages = () => {
    let count = document.querySelector('.mx_RoomSubList_badge').innerHTML
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};