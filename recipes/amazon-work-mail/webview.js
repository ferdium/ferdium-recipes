function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

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

module.exports = Ferdium => {
  const getUnread = () => {
    const nodes = document.querySelectorAll('.giraffe-hierarchy-node-counter');
    let counter = 0;

    for (const node of nodes) {
      counter += Ferdium.safeParseInt(node.textContent);
    }

    Ferdium.setBadge(counter);
  };

  if (!window.location.pathname.includes('auth')) {
    Ferdium.loop(getUnread);

    window.setInterval(() => {
      reload('click');
    }, 60_000);
  }

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
