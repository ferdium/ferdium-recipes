const reload = EventType =>
  new Promise((resolve, reject) => {
    const btn = document.querySelectorAll('.giraffe-hierarchy-node-refresh')[0];
    const EventObject = document.createEvent('Events');
    EventObject.initEvent(EventType, true, false);

    if (btn.dispatchEvent(EventObject)) {
      resolve();
    } else {
      reject();
    }
  });

module.exports = Ferdi => {
  const getUnread = () => {
    const nodes = document.querySelectorAll('.giraffe-hierarchy-node-counter');
    let counter = 0;

    for (const node of nodes) {
      counter += Ferdi.safeParseInt(node.textContent);
    }

    Ferdi.setBadge(counter);
  };

  if (!window.location.pathname.includes('auth')) {
    Ferdi.loop(getUnread);

    window.setInterval(() => {
      reload('click');
    }, 60_000);
  }
};
