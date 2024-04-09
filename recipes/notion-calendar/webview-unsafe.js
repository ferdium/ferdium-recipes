// Workaround for Notion's login window with Google OAuth
if (window.location.href === 'https://calendar.notion.so/login') {
  window.open = function (url) {
    const newUrl = url.replace('popup=true', 'popup=false');
    window.location.href = newUrl;
  };
}
