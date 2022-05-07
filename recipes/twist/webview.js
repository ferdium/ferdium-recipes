module.exports = Ferdium => {
  const getMessages = () => {
    const count = document.querySelectorAll('.switch_pane>.unread').length;
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
