module.exports = Ferdi => {
  const getMessages = () => {
    $.get('/api/_/tickets?filter=unresolved', (data) => {
      Ferdi.setBadge(data.tickets.length);
    });
  };

  Ferdi.loop(getMessages);

/* block popups (prevents freshconnect from opening in a new window) */
  window.open = (function(url, name) {
    console.log(`blocked window.open(${url}, ${name})`);
  });
};
