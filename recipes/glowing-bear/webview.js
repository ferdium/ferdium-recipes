module.exports = Ferdium => {
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
    Ferdium.setBadge(direct, indirect);
  };

  Ferdium.loop(getMessages);
};
