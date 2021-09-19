module.exports = (Ferdi) => {
  const getMessages = () => {
    Ferdi.setBadge(document.querySelector('#unread_count').innerHTML.replace(/\s/g, ''));
  }

  Ferdi.loop(getMessages);
};
