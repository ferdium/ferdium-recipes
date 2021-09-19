module.exports = (Ferdi) => {
  const getMessages = () => {
    // all overdue items are being counted
    const count = document.querySelectorAll('.duedate-overdue').length;

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
