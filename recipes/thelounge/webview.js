module.exports = Ferdi => {
  const getMessages = () => {
    const indirectElements = document.querySelectorAll(
      '.badge:not(.highlight)',
    );
    const direct = document.querySelectorAll('.badge.highlight').length;
    let indirect = 0;
    for (const indirectElement of indirectElements) {
      if (indirectElement.textContent.length > 0) {
        indirect++;
      }
    }
    Ferdi.setBadge(direct, indirect);
  };

  Ferdi.loop(getMessages);
};
