module.exports = Ferdium => {
  const getMessages = () => {
    const button = document.querySelectorAll('[href="#unread"]')[0] ?? {};
    const count = Ferdium.safeParseInt(button.textContent);

    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
