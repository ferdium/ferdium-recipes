function hideInstallMessage() {
  const installMessage = document.querySelector('.usczdcwk');
  if (installMessage) {
    installMessage.style.display =
      installMessage.style.display != 'none'
        ? 'none'
        : installMessage.style.display;
  }
}

module.exports = Ferdium => {
  const getMessages = () => {
		let count = 0;
		
		for (let href of ['/', '/requests/', '/marketplace/']) {
			const elem = document.querySelector(`a[href^='${href}t/'][role='link'][tabindex='0']`).ariaLabel;
			if (elem) {
				const match = elem.match(/(\d+)/g);
				if (match) {
					count += Ferdium.safeParseInt(match[0]);
				}
			}
		}

    Ferdium.setBadge(count);
  };

  const loopRoutine = () => {
    getMessages();
    hideInstallMessage();
  };

  Ferdium.loop(loopRoutine);

  localStorage.setItem(
    '_cs_desktopNotifsEnabled',
    JSON.stringify({
      __t: Date.now(),
      __v: true,
    }),
  );

  if (typeof Ferdium.onNotify === 'function') {
    Ferdium.onNotify(notification => {
      if (typeof notification.title !== 'string') {
        notification.title =
          ((notification.title.props || {}).content || [])[0] || 'Messenger';
      }

      if (typeof notification.options.body !== 'string') {
        notification.options.body =
          (((notification.options.body || {}).props || {}).content || [])[0] ||
          '';
      }

      return notification;
    });
  }
};
