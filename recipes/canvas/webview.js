module.exports = Ferdi => {
  const getMessages = () => {
    let direct = 0;

    const MessageElement = document.querySelector('[id=global_nav_conversations_link]');
    if (MessageElement) {
      direct += Ferdi.safeParseInt(MessageElement.innerHTML);
    }

    Ferdi.setBadge(direct);
  };

  Ferdi.loop(getMessages);
};
