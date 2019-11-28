const path = require("path");

module.exports = Franz => {
  // Apply fixes suggested in
  // https://github.com/getferdi/recipes/issues/1
  Franz.injectCSS(path.join(__dirname, "service.css"));
};
