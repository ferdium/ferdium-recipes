module.exports = Ferdi => {
  const getMessages = () => {
    let directs = 0;
    const element = document.querySelectorAll('.left_count');
    if (element.length > 0) {
      directs = Ferdi.safeParseInt(element[0].textContent);
    }

    Ferdi.setBadge(directs);
  };

  Ferdi.loop(getMessages);
};
