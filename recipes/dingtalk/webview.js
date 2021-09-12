const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (Ferdi) => {
  let checkIsRun = false;
  checkHeightAction = () => {
    checkIsRun = true;
    let checkHeight = setInterval(() => {
      let menuPanel = document.getElementById('menu-pannel')
      if (!menuPanel) {
        return
      }
      menuPanel.parentElement.setAttribute('style', 'height:' + (window.outerHeight - 60) + 'px');
      clearInterval(checkHeight);
      checkIsRun = false
    }, 1000)
  }

  checkHeightAction();

  window.addEventListener('resize', () => {
    if (!checkIsRun) {
      checkHeightAction();
    }
  });

  const getMessages = function getMessages() {
    const x = document.querySelectorAll('.unread-num em.ng-binding')
    Ferdi.setBadge(x.length > 0 ? x[0].innerHTML : 0);
  };

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'style.css'));
};
