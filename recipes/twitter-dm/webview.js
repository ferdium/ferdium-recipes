module.exports = Ferdi => {
  const getMessages = function getMessages() {
    let count = 0;
    const elem = document.querySelector('a[href="/messages"] div div');
    if (elem) {
      count = Ferdi.safeParseInt(elem.innerText);
    }

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
