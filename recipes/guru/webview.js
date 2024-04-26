//const path = require('path');

module.exports = Ferdium => {
  const getMessages = () => {
    const directMessages = $(
      '.module_btn.lonely_btn.white_btn.globalHeader__btn.accountDropdownBtn',
    )?.textContent;

    Ferdium.setBadge(directMessages);
  };

  Ferdium.loop(getMessages);
};
