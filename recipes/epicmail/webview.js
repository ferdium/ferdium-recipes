module.exports = Ferdium => {
  const safeBadgeValue = text =>
    Ferdium.safeParseInt((text || '').replace(/\D/g, '')) || 0;

  const findUnifiedInboxBadge = () => {
    const buttons = document.querySelectorAll(
      'nav.em-sidebar button.em-sidebar__item',
    );
    for (const button of buttons) {
      const name = button
        .querySelector('.em-sidebar__item-name')
        ?.textContent?.trim();
      if (name !== 'Unified Inbox') continue;

      const badge = button.querySelector('.em-sidebar__badge');
      if (!badge) return 0;
      return safeBadgeValue(badge.textContent);
    }

    return 0;
  };

  const sumAccountBadges = () =>
    [
      ...document.querySelectorAll(
        '.em-sidebar__account-row .em-sidebar__badge--sm',
      ),
    ].reduce((total, badge) => total + safeBadgeValue(badge.textContent), 0);

  const getMessages = () => {
    const direct = findUnifiedInboxBadge() || sumAccountBadges();
    Ferdium.setBadge(direct, 0);
  };

  Ferdium.loop(getMessages);
};
