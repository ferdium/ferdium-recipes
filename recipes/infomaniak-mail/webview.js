module.exports = Ferdium => {
  const getMessages = () => {
    const count = document.querySelector('.ws-tree-node-badge');
    const countText = count ? count.textContent : null;
    Ferdium.setBadge(count && countText ? Number(countText) : 0);
  };

  Ferdium.loop(getMessages);
};
