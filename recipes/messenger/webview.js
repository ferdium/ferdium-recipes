module.exports = Ferdi => {
  const getMessages = () => {
    let count = Array.from(document.querySelectorAll('.bp9cbjyn.j83agx80.owycx6da:not(.btwxx1t3)'))
      .map(elem => {
        const hasPing = Boolean(elem.querySelector('.pq6dq46d.is6700om.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.s45kfl79.emlxlaya.bkmhp75w.spb7xbtv.cyypbtt7.fwizqjfa'))
        const isMuted = Boolean(elem.querySelector('.a8c37x1j.ms05siws.l3qrxjdp.b7h9ocf4.trssfv1o'))
        return hasPing - isMuted >= 0 ? hasPing - isMuted : 0;
      })
      .reduce((prev, curr) => prev + curr);
    
    /*
     * add count of message requests on top of notification counter
     */
    const messageRequestsElement = document.querySelector('._5nxf');
    if (messageRequestsElement) {
      count += Ferdi.safeParseInt(messageRequestsElement.textContent);
    }

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);

  localStorage.setItem(
    '_cs_desktopNotifsEnabled',
    JSON.stringify({
      __t: Date.now(),
      __v: true,
    }),
  );

  if (typeof Ferdi.onNotify === 'function') {
    Ferdi.onNotify(notification => {
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
