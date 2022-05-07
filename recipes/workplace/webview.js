const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Ferdium => {
  const getMessages = () => {
    let direct = 0;
    let indirect = 0;
    const chatsElement = document.querySelector('#chats');
    const notifications = document.querySelector('#notifications span span');

    if (notifications) {
      indirect = Ferdium.safeParseInt(notifications.textContent);
    }

    if (chatsElement) {
      if (!chatsElement.hasAttribute('aria-current')) {
        const chatMessages = chatsElement.querySelector('span');

        if (chatMessages) {
          direct = Ferdium.safeParseInt(chatMessages.textContent);
        }
      } else {
        direct = document.querySelectorAll(
          '[data-pagelet="WorkGalahadChannel"] .uiList [role="gridcell"] [role="button"] .oxk9n0fw',
        ).length;
      }
    }

    Ferdium.setBadge(direct, indirect);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'workplace.css'));

  localStorage._cs_desktopNotifsEnabled = JSON.stringify({
    __t: Date.now(),
    __v: true,
  });

  if (typeof Ferdium.onNotify === 'function') {
    Ferdium.onNotify(notification => {
      if (typeof notification.title !== 'string') {
        notification.title =
          ((notification.title.props || {}).content || [])[0] || 'Work Chat';
      }

      if (typeof notification.options.body !== 'string') {
        notification.options.body =
          (((notification.options.body || {}).props || {}).content || [])[0] ||
          '';
      }

      return notification;
    });
  }
};
