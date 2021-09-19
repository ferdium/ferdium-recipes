module.exports = (Ferdi) => {
  const getMessages = () => {
    const count = document.querySelector('a[data-test-folder-name="Inbox"]').getAttribute('data-test-unread-count');
    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
