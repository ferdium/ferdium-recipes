module.exports = (Ferdium) => {
  const getMessages = () => {
    const count = document.querySelector('a[data-test-folder-name="Inbox"]').getAttribute('data-test-unread-count');
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
