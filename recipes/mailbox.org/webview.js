module.exports = (Ferdium) => {
  const getMessages = () => {
    const count = document.querySelectorAll('.new-item').length;

    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
