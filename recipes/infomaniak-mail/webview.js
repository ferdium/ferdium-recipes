module.exports = Ferdi => {
  const getMessages = () => {
    const count = document.querySelector('.ws-tree-node-badge');
    if (count) {
      const countText = count.textContent;
      if (countText) {
        Ferdi.setBadge(
          // eslint-disable-next-line unicorn/prefer-string-slice
          count ? Number(countText.substring(1, countText.length - 1)) : 0,
        );
      }
    }
  };

  Ferdi.loop(getMessages);
};
