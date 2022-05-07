module.exports = Ferdium => {
  const getMessages = () => {
    let direct = 0;

    const MessageElement = document.querySelector(
      '[id=global_nav_conversations_link]',
    );
    if (MessageElement) {
      direct += Ferdium.safeParseInt(MessageElement.textContent);
    }

    Ferdium.setBadge(direct);
  };

  Ferdium.loop(getMessages);
};
