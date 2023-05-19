module.exports = (Ferdium) => {
  const getMessages = function getMessages() {
    let count = 0;
    let messageNameElements = document.getElementsByClassName("MuiTypography-body1");
    if (messageNameElements.length > 0) {
      for (i = 0; i < messageNameElements.length; i++) {
        if (getComputedStyle(messageNameElements[i]).getPropertyValue('font-weight') == "700") {
          count++;
        }
      }
    }
    Ferdium.setBadge(count);
  };
  Ferdium.loop(getMessages);
};
