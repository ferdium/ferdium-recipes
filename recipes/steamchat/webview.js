module.exports = Ferdium => {
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

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="http"]');

    if (link && link.getAttribute('target') === '_top') {
      event.preventDefault();
      event.stopPropagation();
      Ferdium.openNewWindow(link.getAttribute('href'));
    }
  }, true);
};
