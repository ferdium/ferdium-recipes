setTimeout(() => {
  const elem = document.querySelector('#af-error-container');

  // TODO: This will not work for non-english locales
  if (
    elem &&
    elem.textContent &&
    elem.textContent
      .toLowerCase()
      .includes('the requested url was not found on this server')
  ) {
    window.location.reload();
  }
}, 1000);

module.exports = (Ferdium, settings) => {
  const getMessages = () => {
    const messages = document.querySelectorAll('.text-content.unread').length;
    Ferdium.setBadge(messages);
  };

  window.addEventListener('beforeunload', async () => {
    Ferdium.clearStorageData(settings.id, {
      storages: [
        'appcache',
        'serviceworkers',
        'cachestorage',
        'websql',
        'indexdb',
      ],
    });
    Ferdium.releaseServiceWorkers();
  });

  Ferdium.loop(getMessages);

  if (settings.isDarkModeEnabled) {
    localStorage.setItem('dark_mode_enabled', 'true');
  } else {
    localStorage.setItem('dark_mode_enabled', 'false');
  }
};
