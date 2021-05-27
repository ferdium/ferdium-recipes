"use strict";

const path = require('path');

module.exports = (Franz) => {
  Franz.injectJSUnsafe(path.join(__dirname, 'webview-unsafe.js'));
};
