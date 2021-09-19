module.exports = (Ferdi) => {
  const getMessages = () => {
    let direct = 0;
    let indirect = 0;
    Ferdi.setBadge(direct, indirect);
  }

  Ferdi.loop(getMessages);
}
