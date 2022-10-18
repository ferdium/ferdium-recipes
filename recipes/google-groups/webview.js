module.exports = Ferdium => {
  // if the user is on gmail's landing page, go to the login page.

  const getMessages = () => {
    let countImportant = 0;
    console.info(countImportant);
    const conversationLinks = document.querySelectorAll('div[aria-label="Conversations"]');
    if (conversationLinks.length > 0) {
      let conversationCountNode = conversationLinks[0].nextSibling;
      if (conversationCountNode) {
        countImportant = Ferdium.safeParseInt(
          conversationCountNode.textContent.replace(/[^\p{N}]/gu, ''),
        );
      }
    }
    Ferdium.setBadge(countImportant, 0);
  };

  Ferdium.loop(getMessages);
};

  