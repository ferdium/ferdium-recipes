module.exports = Ferdi => {
  const getMessages = () => {
    const element = document.querySelector('.navigationItem-counter');
    if (!element) {
      return;
    }
    const text = element.textContent;
    if (text) {
      // eslint-disable-next-line unicorn/prefer-string-slice
      const count = Ferdi.safeParseInt(text.substring(1, text.length - 1));
      Ferdi.setBadge(count);
    }
  };

  Ferdi.loop(getMessages);
};
