module.exports = Ferdi => {
  const getMessages = () => {
    const indirectElements = document.querySelectorAll('.badge:not(.danger)');
    const direct = document.querySelectorAll('.badge.danger').length - 1;
    let indirect = -1;
    for (const indirectElement of indirectElements) {
      if (
        indirectElement.textContent &&
        indirectElement.textContent.length > 0
      ) {
        indirect++;
      }
    }
    Ferdi.setBadge(direct, indirect);
  };

  Ferdi.loop(getMessages);
};
