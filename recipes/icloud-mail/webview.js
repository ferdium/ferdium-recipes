function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = root => {
    // it's either localised "Inbox" name or unread count.
    const unread = root.querySelector(
      `.mailbox-list-pane .mailbox-list .mailbox-list-item:first-child p:last-child`,
    );
    if (!unread) return;
    const count = Number.parseInt(unread.textContent) ?? 0;
    Ferdium.setBadge(count);
  };

  const getActiveDialogTitle = root => {
    const activeThread = root.querySelector(
      `.thread-list .thread-list-item[aria-selected="true"]`,
    );
    // if there's a active thread, use partipicant names. if not, use mailbox name (inbox, junk, trash etc.)
    if (activeThread) {
      const sender = activeThread.querySelector(
        '.thread-header .thread-participants',
      );
      Ferdium.setDialogTitle(sender.textContent);
      return;
    }

    const activeMailbox = root.querySelector(
      `.mailbox-list-pane .mailbox-list .mailbox-list-item[aria-selected="true"] p`,
    );
    Ferdium.setDialogTitle(activeMailbox.textContent);
  };

  const loopFunc = () => {
    // they put the mail root in an iframe for some reason
    const childDocument = document.querySelector(
      'iframe.child-application#early-child',
    )?.contentDocument;
    getMessages(childDocument);
    getActiveDialogTitle(childDocument);
  };

  Ferdium.loop(loopFunc);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
