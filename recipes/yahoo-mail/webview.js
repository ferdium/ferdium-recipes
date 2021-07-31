module.exports = (Franz) => {
  const getMessages = function getMessages() {
    const count = document.querySelector('a[data-test-folder-name="Inbox"]').getAttribute('data-test-unread-count');
    Franz.setBadge(count);
  };

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
