function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

// Ferdium's notification wrapper inherits the native `onclose` setter which will throw an illegal invocation.
// Element sets `notification.onclose` aborting Matrix's Room.timeline event and leaving new messages unrendered until the room is reopened.
// This fixes this.
const injectElementNotificationFixes = () => {
  const NotificationClass = window.Notification;
  if (
    NotificationClass?.name === 'WrapNotification' &&
    !Object.hasOwn(NotificationClass.prototype, 'onclose')
  ) {
    Object.defineProperty(NotificationClass.prototype, 'onclose', {
      configurable: true,
      writable: true,
      value: null,
    });
  }

  const platform = window.mxPlatformPeg?.get?.();
  if (
    !platform ||
    platform.__elementNotificationClickFix ||
    typeof platform.displayNotification !== 'function'
  ) {
    return;
  }

  // Get notification event ID so that clicking it will jump to the event in the room/timeline
  const displayNotification = platform.displayNotification;
  platform.displayNotification = function (...args) {
    const notification = displayNotification.apply(this, args);
    const room = args[3];
    const event = args[4];
    const eventId = event?.getId?.();

    if (notification && room?.roomId && eventId) {

      notification.onclick = () => {
        window.location.hash = `#/room/${room.roomId}/${eventId}`;
        window.focus();
      };
    }

    return notification;
  };
  platform.__elementNotificationClickFix = true;
};

// Ferdium Badge counting function
module.exports = Ferdium => {
  function getMessages() {
    const matches = document
    .querySelector('title')
    .textContent.match('(?<=\\[)\\d+(?=])');
    const directCount = Ferdium.safeParseInt(matches === null ? 0 : matches[0]);
    const indirectCount = document
    .querySelector('.mx_SpaceTreeLevel')
    .querySelectorAll('.mx_NotificationBadge_dot').length;
    Ferdium.setBadge(directCount, indirectCount);
  }

  Ferdium.loop(getMessages);

  Ferdium.ipcRenderer.sendToHost(
    'inject-js-unsafe',
    `const fix = ${injectElementNotificationFixes.toString()};
    fix();
    setTimeout(fix, 1000);`,
  );

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
