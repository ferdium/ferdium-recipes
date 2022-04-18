module.exports = Ferdium => {
  const getMessages = () => {
    const element = document.querySelector('[href="/notifications"] > div');
    const content = window.getComputedStyle(element, ':after').getPropertyValue('content').match(/\d+/);
    const notifications = Number(content);

    Ferdium.setBadge(notifications);
  };

  Ferdium.loop(getMessages);
};
