
module.exports = Ferdium => {
  const getMessages = () => {
    const directMessages = document.querySelectorAll('.rcx-badge');

    let directMessagesCount = 0;

    for (const directMessage of directMessages) {
      directMessagesCount += Ferdium.safeParseInt(directMessage.textContent);
    }

    const indirectMessagesCount = Math.round(
      document.querySelectorAll('.rcx-sidebar-item--highlighted').length,
    );

    Ferdium.setBadge(directMessagesCount, indirectMessagesCount);
  };

  Ferdium.loop(getMessages);

  const getTeamIcon = function getTeamIcon() {
    const manifestElement = document.querySelector('link[rel="manifest"]');

    if (manifestElement == null) {
      return;
    }

    const manifestUrl = manifestElement.getAttribute('href');

    if (manifestUrl == null) {
      return;
    }

    const xmlhttp = new XMLHttpRequest();

    xmlhttp.addEventListener('readystatechange', function () {
      if (this.readyState != 4 || this.status != 200) {
        return;
      }

      const response = JSON.parse(this.responseText);

      if (response.icons.length > 0) {
        Ferdium.setAvatarImage(`${window.location.protocol}//${window.location.host}${response.icons[0].src}`);
      }
    });

    xmlhttp.open('GET', manifestUrl, true);
    xmlhttp.send();
  };

  setTimeout(() => {
    getTeamIcon();
  }, 4000);
};
