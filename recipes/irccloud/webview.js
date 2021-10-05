module.exports = Ferdi => {
  const getMessages = () => {
    const directMessages = document.querySelectorAll('.buffer.conversation.active.unread.activeBadge').length;
    const indirectMessages = document.querySelectorAll('.buffer.channel.active.unread').length;

    Ferdi.setBadge(directMessages, indirectMessages);
  };

  Ferdi.loop(getMessages);
};
