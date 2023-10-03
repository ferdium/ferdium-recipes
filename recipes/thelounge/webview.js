function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

function countsOfUnreadMessagesAfterMarker(unreadMarker) {
  const children = unreadMarker.parentElement.childNodes;
  let unread = 0;
  let unreadHighlighted = 0;

  for (let i = children.length - 1; i >= 0; i -= 1) {
    if (children[i] === unreadMarker) {
      break;
    }

    if (children[i].classList === undefined) {
      continue;
    }

    if (children[i].classList.contains('msg')) {
      unread += 1;

      if (children[i].classList.contains('highlight')) {
        unreadHighlighted += 1;
      }
    }
  }

  return [unread, unreadHighlighted];
}

function isBadgeInMutedChannel(badgeElement) {
  const channelListItem = badgeElement.closest('.channel-list-item');
  return (channelListItem === null || channelListItem.classList.contains('is-muted'));
}

module.exports = Ferdium => {
  let unreadMessagesAtLastActivity = 0;
  let unreadHighlightedMessagesAtLastActivity = 0;

  const getMessages = () => {
    // In order to get a correct tally of unread messages, we must
    // consider both the badges on the various channels, plus the
    // number of messages that appear after the 'unread' banner that
    // appears in the page. In the latter case, we should ignore any
    // messages that arrived before or while the app has focus.

    let direct = 0;
    const directElements = document.querySelectorAll('.badge.highlight');

    for (const directElement of directElements) {
      // Note: muted channels don't have highlighted badges for direct notifications,
      // but muted networks do
      if (isBadgeInMutedChannel(directElement)) {
        continue;
      }
      
      if (directElement.textContent.length > 0) {
        direct += Ferdium.safeParseInt(directElement.textContent);
      }
    }

    let indirect = 0;
    const indirectElements = document.querySelectorAll(
      '.badge:not(.highlight)',
    );

    for (const indirectElement of indirectElements) {
      if (isBadgeInMutedChannel(indirectElement)) {
        continue;
      }

      if (indirectElement.textContent.length > 0) {
        indirect += 1;
      }
    }

    // Only want to count unread messages if the active channel is unmuted
    if (document.querySelectorAll('.channel-list-item.active:not(.is-muted)').length !== 0) {
      const unreadMarkers = document.querySelectorAll('div.unread-marker');

      if (unreadMarkers.length > 0) {
        const counts = countsOfUnreadMessagesAfterMarker(unreadMarkers[0]);
        const unread = counts[0];
        const unreadHighlighted = counts[1];

        if (document.hasFocus()) {
          unreadMessagesAtLastActivity = unread;
          unreadHighlightedMessagesAtLastActivity = unreadHighlighted;
        }

        if (unread > unreadMessagesAtLastActivity) {
          if (
            unreadHighlighted > 0 &&
            unreadHighlighted > unreadHighlightedMessagesAtLastActivity
          ) {
            direct += unreadHighlighted - unreadHighlightedMessagesAtLastActivity;
          } else {
            indirect += 1;
          }
        }
      } else {
        unreadMessagesAtLastActivity = 0;
        unreadHighlightedMessagesAtLastActivity = 0;
      }
    }

    Ferdium.setBadge(direct, indirect);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  // We need to monkey patch ServierWorker.postMessage so that notifications
  // will work, and that needs to be done without context isolation:
  Ferdium.injectJSUnsafe(_path.default.join(__dirname, 'webview-unsafe.js'));
};
