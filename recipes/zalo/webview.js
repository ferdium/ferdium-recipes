module.exports = Franz => {
  const getMessages = function getMessages() {
    const unread = 0;
    const notificationBadge = document.getElementsByClassName('tab-red-dot').length;
    Franz.setBadge(notificationBadge);
  };

  Franz.loop(getMessages);
};
