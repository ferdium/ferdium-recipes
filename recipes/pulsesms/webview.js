module.exports = Ferdi => {
  const getMessages = () => {
    Ferdi.setBadge(
      document.querySelector('#unread_count').textContent.replace(/\s/g, ''),
    );
  };

  Ferdi.loop(getMessages);
};
