module.exports = (Ferdium) => {
  const getMessages = () => {
    let direct = 0;
    let indirect = 0;
    Ferdium.setBadge(direct, indirect);
  }

  Ferdium.loop(getMessages);
}
