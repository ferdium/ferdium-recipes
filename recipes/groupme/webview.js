module.exports = Ferdium => {
  const getMessages = () => {
    const directMessages = document.querySelectorAll('.badge-count:not(.ng-hide)').length;

    // set Ferdium badge
    Ferdium.setBadge(directMessages);
  };

  Ferdium.loop(getMessages);
};
