module.exports = Ferdium => {
  const getMessages = () => {
    const allMessages = Math.round(
      document.querySelectorAll(
        '#global_filters .top_left_all_messages .count .value',
      )[0].textContent,
    );
    Ferdium.setBadge(allMessages);
  };

  Ferdium.loop(getMessages);
};
