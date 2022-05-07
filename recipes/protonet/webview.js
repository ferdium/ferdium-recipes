module.exports = (Ferdium) => {
  const getMessages = () => {
    const unreadPrivateMessages = Ferdium.safeParseInt($('.messages .unread-meeps').text());
    const unreadGroupMessages = Ferdium.safeParseInt($('.today .unread-meeps').text());

    Ferdium.setBadge(unreadPrivateMessages + unreadGroupMessages);
  };

  Ferdium.loop(getMessages);
};
