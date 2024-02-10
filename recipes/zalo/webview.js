function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let count = 0;

    const unreadRed = document.querySelector('.unread-red');
    if (unreadRed !== null) {
      switch (unreadRed.classList[1]) {
        case 'fa-num1': {
          count = 1;
          break;
        }
        case 'fa-num2': {
          count = 2;
          break;
        }
        case 'fa-num3': {
          count = 3;
          break;
        }
        case 'fa-num4': {
          count = 4;
          break;
        }
        case 'fa-num5': {
          count = 5;
          break;
        }
        default: {
          // fa-num5plus
          const convUnread = document.querySelectorAll(
            '.conv-unread:not(.func-unread__muted)',
          );
          if (convUnread.length === 0)
            count = 6; // 5+
          else
            for (const convUnreadItem of convUnread) {
              switch (convUnreadItem.classList[1]) {
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
