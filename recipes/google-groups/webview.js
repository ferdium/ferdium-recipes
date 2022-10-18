module.exports = Ferdium => {
  // if the user is on gmail's landing page, go to the login page.

  const getMessages = () => {
    let countImportant = 0;
    console.info(countImportant);
    const unReadConversationCount = document.querySelectorAll('.NHlkZc');
    if (unReadConversationCount.length > 0) {
      countImportant = Ferdium.safeParseInt(unReadConversationCount[0].textContent);
    }
    Ferdium.setBadge(countImportant, 0);
  };

  Ferdium.loop(getMessages);
};

  