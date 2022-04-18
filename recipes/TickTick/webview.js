module.exports = (Ferdium) => {
  const getMessages = () => {
    // all overdue items are being counted
    const count = document.querySelectorAll('.duedate-overdue').length;

    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
