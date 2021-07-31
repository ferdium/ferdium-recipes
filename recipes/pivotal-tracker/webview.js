module.exports = (Franz, options) => {
  function getMessages() {
    const bell = document.querySelectorAll('#view65 > span')[0];

    counter = parseInt(bell.innerText);

    Franz.setBadge(counter);
  }

  Franz.loop(getMessages);
};
