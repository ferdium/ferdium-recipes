function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let count = 0;

    const unreadBadge = document
      .querySelector('[data-translate-title="STR_TAB_MESSAGE"]')
      .querySelector('[class*="leftbar-unread-badge"]');
    if (unreadBadge !== null) {
      const unreadBadgeFa = unreadBadge.querySelector('.z-noti-badge__content')
        .classList[1];
      switch (true) {
        case unreadBadgeFa.match('fa-1') !== null: {
          count = 1;
          break;
        }
        case unreadBadgeFa.match('fa-2') !== null: {
          count = 2;
          break;
        }
        case unreadBadgeFa.match('fa-3') !== null: {
          count = 3;
          break;
        }
        case unreadBadgeFa.match('fa-4') !== null: {
          count = 4;
          break;
        }
        case unreadBadgeFa.match('fa-5') !== null &&
          unreadBadgeFa.match('fa-5_Plus') === null: {
          count = 5;
          break;
        }
        default: {
          // fa-5_Plus
          const convUnread = document.querySelectorAll(
            '.conv-action__unread-v2 > div:not([class*="--noti-disable"]',
          );
          if (convUnread.length === 1)
            count = 6; // 5+
          else
            for (const convUnreadItem of convUnread) {
              switch (
                convUnreadItem.querySelector('.z-noti-badge__content')
                  .classList[1]
              ) {
                case 'fa-1_24_Line': {
                  count += 1;
                  break;
                }
                case 'fa-2_24_Line': {
                  count += 2;
                  break;
                }
                case 'fa-3_24_Line': {
                  count += 3;
                  break;
                }
                case 'fa-4_24_Line': {
                  count += 4;
                  break;
                }
                case 'fa-5_24_Line': {
                  count += 5;
                  break;
                }
                default: {
                  // fa-5plus_24_Line
                  count += 6;
                }
              }
            }
        }
      }
    }
    Ferdium.setBadge(count);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
