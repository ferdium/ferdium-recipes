module.exports = (Ferdi) => {
  const getMessages = function getMessages() {
    if (document.location.href == "https://app.hey.com/") {
      let screener = 0;
      let unread = 0;

      if (document.getElementsByClassName('btn--icon-screener').length > 0) {
        let text = document.getElementsByClassName('btn--icon-screener')[0].innerText;

        screener = Ferdi.safeParseInt(/[0-9]+/.exec(text)[0]);
      }

      let postings = document.getElementsByClassName('posting');

      if (postings.length > 0) {
        Array.from(postings).forEach(p => {
          if (p.nodeName == "ARTICLE" && p.getAttribute("data-seen") !== "true") {
            unread++;
          }
        });
      }

      Ferdi.setBadge(unread, screener);
    }
  };

  Ferdi.loop(getMessages);
}
