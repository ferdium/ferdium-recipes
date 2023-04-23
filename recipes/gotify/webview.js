module.exports = Ferdium => {
  const getMessages = () => {
    let count = document.querySelectorAll('#messages').length;

    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
