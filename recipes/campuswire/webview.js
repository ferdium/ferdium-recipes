module.exports = Ferdium => {
  const getMessages = () => {
    let count = document.querySelectorAll(
      '._5fx8:not(._569x),._1ht3:not(._569x)',
    ).length;
    const messageRequestsElement = document.querySelector('._5nxf');

    if (messageRequestsElement) {
      count += Ferdium.safeParseInt(messageRequestsElement.textContent);
    }

    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);

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
          ((notification.title.props || {}).content || [])[0] || 'Campuswire';
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
