module.exports = Ferdium => {
  const getMessages = () => {
    const badges = document.querySelector("home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-sidebar").shadowRoot.querySelectorAll(".notification-badge");
    if (badges.length > 0) {
      var count = Ferdium.safeParseInt(badges[0].textContent.replace(/[^\p{N}]/gu, ''));
      Ferdium.setBadge(count)
    } else {
      Ferdium.setBadge(0)
    }
  };
  Ferdium.loop(getMessages);
};
