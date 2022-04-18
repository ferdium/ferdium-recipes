const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (Ferdium) => {
  const getMessages = () => {
    Ferdium.injectJSUnsafe(_path.default.join(__dirname, 'webview-unsafe.js'));
  };

  //Zoho uses different URLs for different regions. Find out which region the account belongs to and redirect to the correct URL.
  const redirectRegion = () => {
    if (window.location.href === "https://www.zoho.com/mail/login.html") {
      const btn = document.querySelectorAll(".access-apps");
      if (btn.length > 0) {
        window.location.assign(btn[0].href + "zm/");
      }
    }
  }

  window.addEventListener('load', redirectRegion);
  Ferdium.loop(getMessages);
};
