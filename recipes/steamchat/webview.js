module.exports = (Ferdium, settings) => {
  const getMessages = () => {
    // get new msg count
    let count = 0;
    const counters = document.querySelectorAll('[class*=FriendMessageCount]');
    Array.prototype.filter.call(counters, countValue => {
      if (countValue) {
        count += Ferdium.safeParseInt(countValue.textContent);
      }
    });

    const indirectMessages = document.querySelectorAll(
      '[class*=ChatUnreadMessageIndicator]',
    ).length;
    Ferdium.setBadge(count, indirectMessages);

    // force scroll to bottom of chat window
    const chatBoxes = document.querySelectorAll('.chat_dialog');
    if (chatBoxes) {
      const chatBox = Array.prototype.filter.call(
        chatBoxes,
        chat => chat.style.display !== 'none',
      );
      if (chatBox[0]) {
        const chatWindow = chatBox[0].querySelector('.chat_dialog_scroll');
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    }
  };

  Ferdium.loop(getMessages);

  // TODO: See how this can be moved into the main ferdium app and sent as an ipc message for opening with a new window or same Ferdium recipe's webview based on user's preferences
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="http"]');
    const button = event.target.closest('button[title^="http"]');

    if (link || button) {
      const url = link ? link.getAttribute('href') : button.getAttribute('title');

        event.preventDefault();
        event.stopPropagation();

        if (settings.trapLinkClicks === true) {
          window.location.href = url;
        } else {
          Ferdium.openNewWindow(url);
        }
    }
  }, true);
};
