module.exports = Ferdium => {
  function getTasks() {
    let incompleteCount = 0;

    const countEls = document.querySelectorAll(
      '.AppSidebarListsItems__itemContainer__sizeContainer:not([hidden]) > .AppSidebarListsItems__itemContainer__size',
    );

    if (countEls.length > 0) {
      for (const el of countEls) {
        incompleteCount += Ferdium.safeParseInt(el.textContent);
      }
    }

    Ferdium.setBadge(incompleteCount);
  }

  Ferdium.loop(getTasks);
};
