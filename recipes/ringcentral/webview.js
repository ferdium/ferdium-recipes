module.exports = Ferdium => {
  const getMessages = () => {
    let directCount = 0;
    let indirectCount = 0;

    const messageCountElement = document.querySelector('#Message-umi');
    if (messageCountElement) {
      directCount = Ferdium.safeParseInt(messageCountElement.textContent);
    }

    const unreadChats = document.querySelectorAll('.has-unread');
    // unreadChats includes direct messages - do not count them
    indirectCount = unreadChats.length - directCount;

    Ferdium.setBadge(directCount, indirectCount);
  };

  Ferdium.loop(getMessages);
};
