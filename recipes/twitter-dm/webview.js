module.exports = Ferdi => {
  const getMessages = () => {
    let count = 0;
    const elem = document.querySelector('a[href="/messages"] div div');
    if (elem) {
      count = Ferdi.safeParseInt(elem.textContent);
    }

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
