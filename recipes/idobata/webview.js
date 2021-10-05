module.exports = Ferdi => {
  const getMessages = () => {
    const title = document.querySelector('title').textContent.match(/\d+/);
    const count = title !== null ? title[0] : 0;

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
