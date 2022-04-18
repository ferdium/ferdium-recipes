module.exports = Ferdium => {
  const getMessages = () => {
    const unread = document.querySelectorAll('.header__bell-wrapper_unread');
    Ferdium.setBadge(unread.length > 0 ? 1 : 0);
  };

  Ferdium.loop(getMessages);
};
