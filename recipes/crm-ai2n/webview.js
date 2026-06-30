module.exports = Ferdium => {
  const getMessages = () => {
    let direct = 0;
    let indirect = 0;

    // Проверяем непрочитанные задачи/уведомления
    const badges = document.querySelectorAll("[data-unread-count]");
    badges.forEach(badge => {
      const count = parseInt(badge.getAttribute("data-unread-count") || "0", 10);
      direct += count;
    });

    // Проверяем иконку уведомлений
    const notifBadge = document.querySelector(".notification-badge");
    if (notifBadge) {
      const count = parseInt(notifBadge.textContent || "0", 10);
      direct += count;
    }

    Ferdium.setBadge(direct, indirect);
  };

  const getActiveDialogTitle = () => {
    // Получаем заголовок текущей страницы
    const title = document.querySelector("h1");
    Ferdium.setDialogTitle(title ? title.textContent : "CRM AI2N");
  };

  const loopFunc = () => {
    getMessages();
    getActiveDialogTitle();
  };

  Ferdium.loop(loopFunc);
};
