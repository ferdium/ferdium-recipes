module.exports = Ferdium => {
  function getTasks() {
    let todayCount = 0;
    let inboxCount = 0;
    const todayElement = document.querySelector('#filter_today .item_counter');
    const inboxElement = document.querySelector('#filter_inbox .item_counter');

    if (todayElement) {
      todayCount = Ferdium.safeParseInt(todayElement.textContent);
    }

    if (inboxElement) {
      inboxCount = Ferdium.safeParseInt(inboxElement.textContent);
    }

    Ferdium.setBadge(inboxCount, todayCount);
  }

  Ferdium.loop(getTasks);
};
