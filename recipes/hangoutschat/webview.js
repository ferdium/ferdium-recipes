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

  document.addEventListener('click', e => {
    // @ts-ignore
    const { tagName, target, href } = e.target;

    if (tagName === 'A' && target === '_blank') {
      e.preventDefault();
      e.stopImmediatePropagation();
      window.open(href);
    }
  });
};
