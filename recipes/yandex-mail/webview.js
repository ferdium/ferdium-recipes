module.exports = Ferdi => {
  const getMessages = function getMessages() {
    let count = 0;

    if (document.getElementsByClassName('mail-LabelList-Item_count').length > 1) {
      count = Ferdi.safeParseInt(document.getElementsByClassName('mail-LabelList-Item_count')[1].textContent);
    }

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);
};
