//const path = require('path');

module.exports = Ferdium => {
  const getMessages = () => {
    const directMessages = document.querySelectorAll(
      '.MuiBox-root .mui-12z0wuy',
    )?.length;

    Ferdium.setBadge(directMessages);
  };

  Ferdium.loop(getMessages);
};
