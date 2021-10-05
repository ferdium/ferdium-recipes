module.exports = Ferdi => {
  const getMessages = () => {
    const newsDOM = document.querySelectorAll(
      "div[title='All'] > .LeftnavListRow__count",
    )[0].textContent;
    let counter = Ferdi.safeParseInt(newsDOM);

    if (newsDOM && (newsDOM.includes('K') || newsDOM.includes('+'))) {
      counter = `${newsDOM.slice(0, Math.max(0, newsDOM.indexOf('K')))}000`;
    }

    Ferdi.setBadge(counter);
  };

  Ferdi.loop(getMessages);
};
