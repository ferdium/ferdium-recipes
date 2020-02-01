module.exports = (Franz) => {

  const muteSelector = '.DQy0Rb';
  const directMessageSelector = '.eM5l9e.FVKzAb';
  const indirectMessageSelector = '.PL5Wwe.H7du2 .t5F5nf';

  const isMuted = node => !!node.closest('[role="listitem"]').querySelector(muteSelector);

  const getMessages = function getMessages() {

    // get unread messages
    let directCount = 0;
    document.querySelectorAll(directMessageSelector).forEach((node) => {
      // Hangouts Chat overrides the muted indicator when there is a direct mention
      if (!isMuted(node)) {
        directCount += 1;
      }
    });

    let indirectCount = 0;
    document.querySelectorAll(indirectMessageSelector).forEach((node) => {
      if (!isMuted(node)) {
        indirectCount += 1;
      }
    });
    indirectCount -= directCount;

    // set Franz badge
    Franz.setBadge(directCount, indirectCount);
  };

  document.addEventListener('click', (e) => {
    const { tagName, target, href } = e.target;

    if (tagName === 'A' && target === '_blank') {
      e.preventDefault();
      e.stopImmediatePropagation();
      window.open(href);
    }
  });

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
