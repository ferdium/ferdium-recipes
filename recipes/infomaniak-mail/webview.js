module.exports = Ferdi => {
  const getMessages = () => {
    const count = document.querySelector('.ws-tree-node-badge');
    const countText = count ? count.textContent : null;
    Ferdi.setBadge(count && countText ? Number(countText) : 0);
  };

  Ferdi.loop(getMessages);
};
