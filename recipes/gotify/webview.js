const path = require('path');

module.exports = Ferdium => {
  window.addEventListener('gotify-ferdium-badge', event => {
    Ferdium.setBadge(event.detail?.count || 0, 0);
  });

  Ferdium.injectJSUnsafe(path.join(__dirname, 'badge.js'));
  Ferdium.loop(() => {
    window.dispatchEvent(new CustomEvent('gotify-ferdium-poll'));
  });
};
