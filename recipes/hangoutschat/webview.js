function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  // class corresponding to the red badge that is visible for direct messages
  const directMessageSelector = 'div.V6.CL.su.ahD.X9.Y2 span.akt span.XU';

  // class corresponding to the bold text that is visible for room messages
  const indirectMessageSelector = 'div.V6.CL.V2.X9.Y2 span.akt span.XU';

  const getMessages = () => {
    // get unread direct messages
    let directCount;
    let indirectCount;

    const directCountSelector = document.querySelector(directMessageSelector);
    if (directCountSelector) {
      directCount = Number(directCountSelector.textContent);
    }

    // get unread indirect messages
    const indirectCountSelector = document.querySelector(
      indirectMessageSelector,
    );
    if (indirectCountSelector) {
      indirectCount = Number(indirectCountSelector.textContent);
    }

    // set Ferdium badge
    Ferdium.setBadge(directCount, indirectCount);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  document.addEventListener('click', e => {
    // @ts-expect-error
    const { tagName, target, href } = e.target;

    if (tagName === 'A' && target === '_blank') {
      e.preventDefault();
      e.stopImmediatePropagation();
      window.open(href);
    }
  });
};
