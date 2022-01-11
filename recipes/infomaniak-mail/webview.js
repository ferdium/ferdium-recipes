module.exports = Ferdi => {
  const getMessages = () => {
    const count = document.querySelector('.ws-tree-node-badge');
    const countText = count ? count.textContent : null;
    Ferdi.setBadge(count && countText ? Number(countText.substring(1, countText.length - 1)) : 0);
  };

  Ferdi.loop(getMessages);
};
