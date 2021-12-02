module.exports = Ferdi => {
  const getMessages = function getMessages() {
    // Get value of <title> tag where in case of new messages the number of messages appear
    const titleValue = document.querySelector('title').text;
    const match = titleValue.match(/\d+/);
    const unread = match != null && match.length > 0 ? match[0] : 0;

    Ferdi.setBadge(Ferdi.safeParseInt(unread));
  };

  Ferdi.loop(getMessages);
};
