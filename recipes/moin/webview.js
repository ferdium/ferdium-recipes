module.exports = Ferdium => {
  // moin.net prefixes the page title with the unread count, e.g. "(3) MOiN",
  // covering notifications and direct messages ("(99+)" above 99).
  const getMessages = () => {
    const match = document.title.match(/^\((\d+)\+?\)/);
    Ferdium.setBadge(match ? Number.parseInt(match[1], 10) : 0, 0);
  };

  Ferdium.loop(getMessages);
};
