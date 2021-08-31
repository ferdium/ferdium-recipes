module.exports = (Ferdi) => {
  const getMessages = () => {
    const unreadPrivateMessages = Ferdi.safeParseInt($('.messages .unread-meeps').text());
    const unreadGroupMessages = Ferdi.safeParseInt($('.today .unread-meeps').text());

    Ferdi.setBadge(unreadPrivateMessages + unreadGroupMessages);
  };

  Ferdi.loop(getMessages);
};
