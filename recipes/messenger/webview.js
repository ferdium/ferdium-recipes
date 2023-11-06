function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

function hideInstallMessage() {
  const installMessage = document.querySelector('.usczdcwk');
  if (installMessage) {
    installMessage.style.display =
      installMessage.style.display === 'none'
        ? installMessage.style.display
        : 'none';
  }
}

module.exports = (Ferdium, settings) => {
  const getMessages = () => {
    let count = 0;
    let newMessengerUI = false;

    /*
     * try the counting with the new UI
     */
    for (let href of ['/', '/requests/', '/marketplace/']) {
      const elem = document.querySelector(
        `a[href^='${href}t/'][role='link'][tabindex='0']`,
      ).ariaLabel;
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
      count = [
        ...document.querySelectorAll(
          '.bp9cbjyn.j83agx80.owycx6da:not(.btwxx1t3)',
        ),
      ]
        .map(elem => {
          const hasPing = !!elem.querySelector(
            '.pq6dq46d.is6700om.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.s45kfl79.emlxlaya.bkmhp75w.spb7xbtv.cyypbtt7.fwizqjfa',
          );
          const isMuted = !!elem.querySelector(
            '.a8c37x1j.ms05siws.l3qrxjdp.b7h9ocf4.trssfv1o',
          );

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

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

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

  document.addEventListener(
    'click',
    event => {
      const link = event.target.closest('a[href^="http"]');
      const button = event.target.closest('button[title^="http"]');

      if (link || button) {
        const url = link
          ? link.getAttribute('href')
          : button.getAttribute('title');

        event.preventDefault();
        event.stopPropagation();

        if (url.includes('fbsbx.com') || settings.trapLinkClicks === true) {
          // 'fbsbx.com is Facebook file hosting service. Always open file downloads in Ferdium.
          window.location.href = url;
        } else {
          Ferdium.openNewWindow(url);
        }
      }
    },
    true,
  );
};
