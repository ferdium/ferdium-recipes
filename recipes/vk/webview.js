module.exports = Ferdium => {
  const getMessages = () => {
    let directs = 0;
    const element = document.querySelectorAll('.left_count');
    if (element.length > 0) {
      directs = Ferdium.safeParseInt(element[0].textContent);
    }

    Ferdium.setBadge(directs);
  };

  const getActiveDialogTitle = () => {
    const element = [
      document.querySelector(
        '.FCWindow--active .FCWindow__title .ConvoTitle__title',
      ),
      document.querySelector('.im-page_history-show ._im_page_peer_name'),
    ].find(Boolean);

    Ferdium.setDialogTitle(element ? element.textContent : null);
  };

  const loopFunc = () => {
    getMessages();
    getActiveDialogTitle();
  };

  Ferdium.loop(loopFunc);
};
