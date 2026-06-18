module.exports = Ferdium => {
  const safeBadgeValue = text =>
    Ferdium.safeParseInt((text || '').replace(/\D/g, '')) || 0;

  const getExplicitBadge = () => {
    const badgeNode = document.querySelector('[data-ferdium-badge]');
    if (!badgeNode) return 0;

    const value = badgeNode.dataset.ferdiumBadge || badgeNode.textContent;
    return safeBadgeValue(value);
  };

  const getMessages = () => {
    Ferdium.setBadge(getExplicitBadge(), 0);
  };

  Ferdium.loop(getMessages);
};
