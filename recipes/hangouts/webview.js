module.exports = Ferdium => {
  const getMessages = () => {
    // get unread messages
    const count = document.querySelector('#hangout-landing-chat iframe').contentWindow.document.querySelectorAll('.ee').length;

    // set Ferdium badge
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
