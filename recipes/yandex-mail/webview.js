module.exports = Ferdi => {
  const getMessages = () => {
    let count = 0;

    if (document.querySelectorAll('.mail-LabelList-Item_count').length > 1) {
      count = Ferdi.safeParseInt(document.querySelectorAll('.mail-LabelList-Item_count')[1].textContent);
    }

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
