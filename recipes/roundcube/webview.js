module.exports = Ferdi => {
  const getMessages = () => {
    const directElements = document.querySelectorAll('.unreadcount');
    let direct = 0;
    for (let i = 0; i < directElements.length; i += 1) {
      direct += Ferdi.safeParseInt(directElements[i].innerHTML);
    }
    Ferdi.setBadge(direct);
  };

  Ferdi.loop(getMessages);
};
