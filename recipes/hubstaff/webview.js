module.exports = (Ferdi) => {
  // TODO: If your hubstaff service has unread messages, uncomment these lines to implement the logic for updating the badges
  const getMessages = () => {
    // TODO: Insert your notification-finding code here
    let directMessages = 0;
    let indirectMessages = 0;
    const notificationContainers = document.querySelectorAll('.notifications-number');
    if (notificationContainers){
      directMessages = Ferdi.safeParseInt(notificationContainers[0].textContent);
      indirectMessages = Ferdi.safeParseInt(notificationContainers[1].textContent);
    }
    Ferdi.setBadge(directMessages, indirectMessages);
  };
  Ferdi.loop(getMessages);
};
