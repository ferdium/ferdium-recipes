module.exports = (Ferdium) => {
  const getMessages = () => {
    const count = document.querySelector('a[data-test-folder-name="Inbox"] span[data-test-id="displayed-count"]').textContent;
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
