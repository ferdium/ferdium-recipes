module.exports = Ferdium => {
  const getMessages = () => {
    const directMessages = document.querySelectorAll('.buffer.conversation.active.unread.activeBadge').length;
    const indirectMessages = document.querySelectorAll('.buffer.channel.active.unread').length;

    Ferdium.setBadge(directMessages, indirectMessages);
  };

  Ferdium.loop(getMessages);
};
