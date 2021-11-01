module.exports = Ferdi => {
  const getMessages = () => {
    const directCountSelector = [...document.querySelectorAll('[data-region="count-container"]')];
    const totalMessageCount = directCountSelector.reduce(
      ((count, item) => count + Ferdi.safeParseInt(item.textContent)),
      0
    );

    Ferdi.setBadge(totalMessageCount, 0);
  };
  Ferdi.loop(getMessages);
};
