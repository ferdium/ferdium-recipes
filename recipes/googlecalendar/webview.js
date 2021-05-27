'use strict';

const path = require('path');

module.exports = Franz => {
  Franz.injectCSS(path.join(__dirname, 'calendar.css'));
  Franz.injectJSUnsafe(path.join(__dirname, 'webview-unsafe.js'));
};
