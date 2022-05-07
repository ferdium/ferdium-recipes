module.exports = Ferdium => {
  const getMessages = () => {
    // eslint-disable-next-line no-undef
    const count = feedbin.count_data.unread_entries.length > 0 || 0;
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
