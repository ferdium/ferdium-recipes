module.exports = Ferdi => {
  const getMessages = () => {
    let directs = 0;
    const element = document.getElementsByClassName('left_count');
    if (element.length > 0) {
      directs = Ferdi.safeParseInt(element[0].innerText);
    }

    Ferdi.setBadge(directs);
  };

  Ferdi.loop(getMessages);
};
