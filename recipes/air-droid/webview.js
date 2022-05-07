module.exports = (Ferdium) => {
  const getMessages = () => {
    const count = {};
    const data = document.querySelector('#FranzMessages').dataset;
    if (data) {
      count.count = data.direct;
      count.count_indirect = data.indirect;
    }

    Ferdium.setBadge(count);
  }

  Ferdium.loop(getMessages);
};
