
function countsOfUnreadMessagesAfterMarker(unreadMarker) {
  var children = unreadMarker.parentElement.childNodes;
  var unread = 0;
  var unreadHighlighted = 0;

  for(var i = children.length-1; i >= 0; --i) {
    if (children[i] === unreadMarker) {
      break;
    }

    if (children[i].classList === undefined) {
      continue;
    }

    if (children[i].classList.contains('msg')) {
      unread++;

      if (children[i].classList.contains('highlight')) {
        unreadHighlighted++;
      }
    }
  }

  return [unread, unreadHighlighted];
}

module.exports = Ferdium => {
  var unreadMessagesAtLastActivity = 0;
  var unreadHighlightedMessagesAtLastActivity = 0;

  const getMessages = () => {
    // In order to get a correct tally of unread messages, we must
    // consider both the badges on the various channels, plus the
    // number of messages that appear after the 'unread' banner that
    // appears in the page. In the latter case, we should ignore any
    // messages that arrived before or while the app has focus.

    let direct = 0;
    var directElements = document.querySelectorAll('.badge.highlight');

    for (const directElement of directElements) {
      if (directElement.textContent.length > 0) {
        direct += Ferdium.safeParseInt(directElement.textContent);
      }
    }

    let indirect = 0;
    const indirectElements = document.querySelectorAll(
      '.badge:not(.highlight)',
    );
    for (const indirectElement of indirectElements) {
      if (indirectElement.textContent.length > 0) {
        indirect++;
      }
    }

    const unreadMarkers = document.querySelectorAll('div.unread-marker');

    if (unreadMarkers.length > 0) {
      var counts = countsOfUnreadMessagesAfterMarker(unreadMarkers[0]);
      var unread = counts[0];
      var unreadHighlighted = counts[1];

      if (document.hasFocus()) {
        unreadMessagesAtLastActivity = unread;
        unreadHighlightedMessagesAtLastActivity = unreadHighlighted;
      }

      if (unread > unreadMessagesAtLastActivity) {
        if (unreadHighlighted > 0 && unreadHighlighted > unreadHighlightedMessagesAtLastActivity) {
          direct += (unreadHighlighted - unreadHighlightedMessagesAtLastActivity);
        } else {
          indirect++;
        }
      }
    } else {
      unreadMessagesAtLastActivity = 0;
      unreadHighlightedMessagesAtLastActivity = 0;
    }

    Ferdium.setBadge(direct, indirect);
  };

  Ferdium.loop(getMessages);

  // We need to monkey patch ServierWorker.postMessage so that notifications
  // will work, and that needs to be done without context isolation:
  const path = require('path');
  Ferdium.injectJSUnsafe(path.join(__dirname, 'webview-unsafe.js'));
};
