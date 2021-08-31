module.exports = (Ferdi) => {
  function getMessages() {
    const numMessages = Ferdi.safeParseInt(document.querySelector('.left-nav [data-content="Inbox"] .unread__container .unread').innerHTML);
    Ferdi.setBadge(numMessages);
  }

  Ferdi.loop(getMessages);
};
