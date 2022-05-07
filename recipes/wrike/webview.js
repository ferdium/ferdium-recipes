module.exports = Ferdium => {
  const getMessages = () => {
    let directCount = 0;
    const element = document.querySelector(
      '.ws-navigation-button__indicator.ws-navigation-button-indicator',
    );
    if (element) {
      directCount = Ferdium.safeParseInt(element.textContent);
    }

    Ferdium.setBadge(directCount);
  };

  Ferdium.loop(getMessages);
};
