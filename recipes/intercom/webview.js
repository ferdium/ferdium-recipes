module.exports = (Ferdi) => {
    function getMessages() {
      const numMessages = parseInt(document.querySelector('.left-nav [data-content="Inbox"] .unread__container .unread').innerHTML.trim());
      if (numMessages >= 0) {  
        Ferdi.setBadge(numMessages, 0);
      } else {
         Ferdi.setBadge(0, 0);
      }
    }
  
    Ferdi.loop(getMessages);
  }