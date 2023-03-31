module.exports = Ferdium => {
  const getMessages = () => {
    // get unread messages
    let count = 0;
    for (const span of document.querySelectorAll('span[jsname=DW2nlb]'))  count += Ferdium.safeParseInt(span.textContent);

    // set Ferdium badge
    Ferdium.setBadge(count);
  };

  Ferdium.loop(getMessages);
};
