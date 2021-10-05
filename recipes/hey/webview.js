module.exports = Ferdi => {
  const getMessages = () => {
    if (document.location.href == 'https://app.hey.com/') {
      let screener = 0;
      let unread = 0;

      if (document.querySelectorAll('.btn--icon-screener').length > 0) {
        let text = document.querySelectorAll('.btn--icon-screener')[0]
          .textContent;
        if (text) {
          const parsedText = Ferdi.safeParseInt(/\d+/.exec(text));
          screener = parsedText[0];
        }
      }

      let postings = document.querySelectorAll('.posting');

      if (postings.length > 0) {
        for (const p of postings) {
          if (
            p.nodeName == 'ARTICLE' &&
            p.getAttribute('data-seen') !== 'true'
          ) {
            unread++;
          }
        }
      }

      Ferdi.setBadge(unread, screener);
    }
  };

  Ferdi.loop(getMessages);
};
