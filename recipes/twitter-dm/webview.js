module.exports = Ferdium => {
  const getMessages = () => {
    let count = 0;
    const elem = document.querySelector('a[href="/messages"] div div');
    if (elem) {
      count = Ferdium.safeParseInt(elem.textContent);
    }

    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
