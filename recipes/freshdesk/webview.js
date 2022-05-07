module.exports = Ferdium => {
  const getMessages = () => {
    $.get('/api/_/tickets?filter=unresolved', (data) => {
      Ferdium.setBadge(data.tickets.length);
    });
  };

  Ferdium.loop(getMessages);

/* block popups (prevents freshconnect from opening in a new window) */
  window.open = (function(url, name) {
    console.log(`blocked window.open(${url}, ${name})`);
  });
};
