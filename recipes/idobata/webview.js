module.exports = Ferdium => {
  const getMessages = () => {
    const title = document.querySelector('title').textContent.match(/\d+/);
    const count = title === null ? 0 : title[0];

    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
