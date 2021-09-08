setTimeout(() => {
  const elem = document.querySelector('#af-error-container');

  if (elem && elem.innerText.toLowerCase().includes('the requested url was not found on this server')) {
    window.location.reload();
  }
}, 1000);

window.addEventListener('beforeunload', async () => {
  Ferdi.clearStorageData(['appcache', 'serviceworkers', 'cachestorage', 'websql', 'indexdb']);
  Ferdi.releaseServiceWorkers();
});

module.exports = (Ferdi, settings) => {
  function getMessages() {
    const messages = document.querySelectorAll('.text-content.unread').length;
    Ferdi.setBadge(messages);
  }

  Ferdi.loop(getMessages);

  if (settings.isDarkModeEnabled) {
    localStorage.setItem('dark_mode_enabled', 'true');
  } else {
    localStorage.setItem('dark_mode_enabled', 'false');
  }
};
