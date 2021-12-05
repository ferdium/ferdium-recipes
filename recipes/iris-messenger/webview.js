module.exports = Ferdi => {
  const getMessages = () => {
    let count = 0;
    const element = document.querySelector('.unseen-total');
    if (element) {
      count = Ferdi.safeParseInt(element.textContent);
    }
    Ferdi.setBadge(count);
  };
  Ferdi.loop(getMessages);
};
