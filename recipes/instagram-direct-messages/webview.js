"use strict";

const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

setInterval(() => {
  document.querySelector("._lz6s.Hz2lF").style.display = "none";
  document.querySelector(".t30g8.L1C6I").style.paddingTop = 0;
  document.querySelector(".i0EQd").style.maxWidth = 'unset !important';
}, 3000);

module.exports = (Ferdium) => {
  const getMessages = () => {
    let count = 0;
    const elements = document.querySelectorAll('.rBNOH.soMvl');
    if (elements.length > 0) {
      count += 1;
    }
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
