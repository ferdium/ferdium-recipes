module.exports = (Ferdi) => {
  const getMessages = () => {
    let indirect = document.querySelectorAll('.new-messages');
    let direct = 0;
    document.querySelectorAll('.people-pane .badge').forEach(function(badge){
      direct += Ferdi.safeParseInt(badge.innerText);
    });
    Ferdi.setBadge(direct, indirect);
  };

  Ferdi.loop(getMessages);
};
