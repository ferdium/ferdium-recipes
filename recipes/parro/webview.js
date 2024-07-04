module.exports = Ferdium => {
  function getMessages() {
    let direct = 0;
    let indirect = 0;
    const FerdiumData = document.querySelector('#FerdiumMessages').dataset;
    if (FerdiumData) {
      direct = FerdiumData.direct;
      indirect = FerdiumData.indirect;
    }

    Ferdium.setBadge(direct, indirect);
  }

  Ferdium.loop(getMessages);
};
