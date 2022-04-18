module.exports = Ferdium => {
  const getMessages = () => {
    let indirect = document.querySelectorAll('.new-messages');
    let direct = 0;
    for (const badge of document.querySelectorAll('.people-pane .badge')) {
      direct += Ferdium.safeParseInt(badge.textContent);
    }
    Ferdium.setBadge(direct, indirect);
  };

  Ferdium.loop(getMessages);
};
