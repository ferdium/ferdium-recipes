module.exports = (Ferdium) => {
  const getMessages = () => {
    const all_articles = document.querySelector('#unread_cnt_all_items');
    if (!all_articles) return;

    const unread_articles_cnt = Number(all_articles.textContent.split('+')[0]);
    Ferdium.setBadge(unread_articles_cnt);
  };

  Ferdium.loop(getMessages);
};
