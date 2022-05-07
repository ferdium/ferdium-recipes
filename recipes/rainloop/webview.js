module.exports = Ferdium => {
  const getMessages = () => {
    let messages = 0;

    // Let's only loop through user folders, as all system folders are duplicated there
    for (const obj of document.querySelectorAll('.b-folders-user .ui-droppable')) {
      const countEl = obj.querySelector('.count');
      const countText = countEl ? countEl.innerHTML : '';

      if (countText != '') {
        if (obj.classList.contains('system')) {
          // Only count the Inbox system folder and ignore Archive, Trash, Drafts, Spam, Sent
          if (obj.classList.contains('i-am-inbox')) {
            messages += Ferdium.safeParseInt(countText);
          }
        } else {
          messages += Ferdium.safeParseInt(countText);
        }
      }
    }

    Ferdium.setBadge(messages);
  };

  Ferdium.loop(getMessages);
};
