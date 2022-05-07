const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const SELECTOR_CHANNELS_UNREAD =
  '.p-channel_sidebar__channel--unread:not(.p-channel_sidebar__channel--muted)';

module.exports = Ferdium => {
  const getMessages = () => {
    const directMessages = document.querySelectorAll(
      `${SELECTOR_CHANNELS_UNREAD} .p-channel_sidebar__badge, .p-channel_sidebar__link--unread:not([data-sidebar-link-id="Punreads"]):not([data-sidebar-link-id="Pdrafts"]):not([data-sidebar-link-id="Pdms"])`,
    ).length;
    const allMessages =
      document.querySelectorAll(SELECTOR_CHANNELS_UNREAD).length -
      directMessages;
    Ferdium.setBadge(directMessages, allMessages);
  };

  const getActiveDialogTitle = () => {
    const element = document.querySelector(
      '.p-channel_sidebar__channel--selected .p-channel_sidebar__name',
    );

    Ferdium.setDialogTitle(
      element && element.firstChild ? element.firstChild.textContent : null,
    );
  };

  const loopFunc = () => {
    getMessages();
    getActiveDialogTitle();
  };

  Ferdium.loop(loopFunc);

  const getTeamIcon = function getTeamIcon(count = 0) {
    let countTeamIconCheck = count;
    let bgUrl = null;
    const teamMenu = document.querySelector(
      '#team-menu-trigger, .p-ia__sidebar_header__team_name',
    );

    if (teamMenu) {
      teamMenu.click();
      const icon = document.querySelector('.c-team_icon');

      if (icon) {
        bgUrl = window
          .getComputedStyle(icon, null)
          .getPropertyValue('background-image');
        bgUrl = /^url\((["']?)(.*)\1\)$/.exec(bgUrl);
        bgUrl = bgUrl ? bgUrl[2] : '';
      }

      setTimeout(() => {
        document.querySelector('.ReactModal__Overlay').click();
      }, 10);
    }

    countTeamIconCheck += 1;

    if (bgUrl) {
      Ferdium.setAvatarImage(bgUrl);
    } else if (countTeamIconCheck <= 5) {
      setTimeout(() => {
        getTeamIcon(countTeamIconCheck + 1);
      }, 2000);
    }
  };

  setTimeout(() => {
    getTeamIcon();
  }, 4000);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
