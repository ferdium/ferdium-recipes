module.exports = Ferdi => {
  function getMessages() {
    let direct = 0;

    const np = document.querySelector('#noti_np_count');
    const re = document.querySelector('#noti_re_count');

    if (np) {
      direct += Ferdi.safeParseInt(np.innerHTML);
    }
    if (re) {
      direct += Ferdi.safeParseInt(re.innerHTML);
    }

    Ferdi.setBadge(direct);
  }

  Ferdi.loop(getMessages, 10000);
};
