module.exports = Ferdium => {
  const getMessages = () => {
    let direct = 0;

    const np = document.querySelector('#noti_np_count');
    const re = document.querySelector('#noti_re_count');

    if (np) {
      direct += Ferdium.safeParseInt(np.textContent);
    }
    if (re) {
      direct += Ferdium.safeParseInt(re.textContent);
    }

    Ferdium.setBadge(direct);
  };

  Ferdium.loop(getMessages, 10_000);
};
