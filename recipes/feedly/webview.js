module.exports = Ferdi => {
  const getMessages = () => {
    const newsDOM = document.querySelectorAll(
      "div[title='All'] > .LeftnavListRow__count",
    );

    let counter = 0;

    if (newsDOM && newsDOM.length > 0) {
      const textContent = newsDOM[0].textContent;

      counter = textContent.includes('K') || textContent.includes('+') ? `${textContent.slice(0, Math.max(0, textContent.indexOf('K')))}000` : Ferdi.safeParseInt(textContent);
    }

    Ferdi.setBadge(counter);
  };

  Ferdi.loop(getMessages);
};
