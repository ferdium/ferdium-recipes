module.exports = Ferdi => {
  function getTasks() {
    let incompleteCount = 0;

    const countEls = document.querySelectorAll(
      '.AppSidebarListsItems__itemContainer__sizeContainer:not([hidden]) > .AppSidebarListsItems__itemContainer__size',
    );

    if (countEls.length > 0) {
      for (const el of countEls) {
        incompleteCount += Ferdi.safeParseInt(el.textContent);
      }
    }

    Ferdi.setBadge(incompleteCount);
  }

  Ferdi.loop(getTasks);
};
