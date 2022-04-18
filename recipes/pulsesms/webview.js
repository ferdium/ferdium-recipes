module.exports = Ferdium => {
  const getMessages = () => {
    Ferdium.setBadge(
      document.querySelector('#unread_count').textContent.replace(/\s/g, ''),
    );
  };

  Ferdium.loop(getMessages);
};
