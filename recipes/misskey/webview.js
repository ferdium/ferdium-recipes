module.exports = Ferdi => {
  const getMessages = () => {
    // check notification badge for Ferdi badge
    let hasNotification = !!document.querySelector(
      '#app div.notifications > button > i.circle',
    );
    Ferdi.setBadge(0, hasNotification ? 1 : 0);
  };

  Ferdi.loop(getMessages);
};
