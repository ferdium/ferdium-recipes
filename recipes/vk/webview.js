module.exports = Ferdi => {
  const getMessages = () => {
    let directs = 0;
    const element = document.querySelectorAll('.left_count');
    if (element.length > 0) {
      directs = Ferdi.safeParseInt(element[0].textContent);
    }

    Ferdi.setBadge(directs);
  };

  const getActiveDialogTitle = () => {
    const element = [
      document.querySelector(
        '.FCWindow--active .FCWindow__title .ConvoTitle__title',
      ),
      document.querySelector('.im-page_history-show ._im_page_peer_name'),
    ].find(Boolean);

    Ferdi.setDialogTitle(element ? element.textContent : null);
  };

  const loopFunc = () => {
    getMessages();
    getActiveDialogTitle();
  };

  Ferdi.loop(loopFunc);
};
