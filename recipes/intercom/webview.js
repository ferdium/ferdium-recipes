module.exports = Ferdium => {
  const getMessages = () => {
    const numMessages = Ferdium.safeParseInt(
      document.querySelector(
        '.left-nav [data-content="Inbox"] .unread__container .unread',
      ).textContent,
    );
    Ferdium.setBadge(numMessages);
  };

  Ferdium.loop(getMessages);
};
