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
    let newMessengerUI = false;

    /*
     * try the counting with the new UI
     */
    for (let href of ['/', '/requests/', '/marketplace/']) {
      const elem = document.querySelector(`a[href^='${href}t/'][role='link'][tabindex='0']`).ariaLabel;
      if (elem) {
        newMessengerUI = true;
        const match = elem.match(/(\d+)/g);
        if (match) {
          count += Ferdium.safeParseInt(match[0]);
        }
      }
    }

    /*
     * do the old counting if the interface is not the last one
     */
    if (!newMessengerUI) {
      count = [...document.querySelectorAll('.bp9cbjyn.j83agx80.owycx6da:not(.btwxx1t3)')]
        .map(elem => {
          const hasPing = !!elem.querySelector('.pq6dq46d.is6700om.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.s45kfl79.emlxlaya.bkmhp75w.spb7xbtv.cyypbtt7.fwizqjfa');
          const isMuted = !!elem.querySelector('.a8c37x1j.ms05siws.l3qrxjdp.b7h9ocf4.trssfv1o');

          return hasPing && !isMuted;
        })
        .reduce((prev, curr) => prev + curr, 0);

      /*
        * add count of message requests on top of notification counter
        */
      const messageRequestsElement = document.querySelector('._5nxf');
      if (messageRequestsElement) {
        count += Ferdium.safeParseInt(messageRequestsElement.textContent);
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
