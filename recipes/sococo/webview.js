module.exports = Ferdi => {
  const getMessages = () => {
    let indirect = document.querySelectorAll('.new-messages');
    let direct = 0;
    for (const badge of document.querySelectorAll('.people-pane .badge')) {
      direct += Ferdi.safeParseInt(badge.textContent);
    }
    Ferdi.setBadge(direct, indirect);
  };

  Ferdi.loop(getMessages);
};
