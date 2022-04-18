module.exports = Ferdium => {
  const getMessages = () => {
    let direct = 0;
    let indirect = 0;

    // Count how many people/groups have texted you
    const conversationElems = document.querySelectorAll(
      '[data-uie-name="conversation-folder-badge"]',
    );
    if (conversationElems) {
      for (const conversationElem of conversationElems) {
        direct += Ferdium.safeParseInt(conversationElem.textContent);
      }
    }

    // Count unread pending user requests
    const pendingElem = document.querySelector(
      '[data-uie-name="item-pending-requests"]',
    );
    if (pendingElem) {
      const matches =
        pendingElem.textContent && pendingElem.textContent.match(/^([1-9]\d*)/);
      if (matches && matches.length > 1) {
        indirect += Ferdium.safeParseInt(matches[1]);
      }
    }

    // Alternative would be to count all messages (unread conversation count + pending) from the header
    // const titleElem = document.querySelector('head title');
    // const matches = titleElem.textContent.match(/^\(([1-9][0-9]*)\)/);
    // if (matches) {
    // 	direct = matches[1];
    // }

    Ferdium.setBadge(direct, indirect);
  };

  Ferdium.loop(getMessages);
};
