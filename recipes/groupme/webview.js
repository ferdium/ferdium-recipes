module.exports = Ferdium => {
  const getMessages = () => {

    // array-ify the list of conversations
    const allConversations = [...document.querySelectorAll('#tray .tray-list .list-item')]
    // for each conversation on the list...
    const filteredConversations = allConversations.filter(e => {
      // keep it on the list if [1] it has unread messages (not .ng-hide), and [2] it isn't muted (not .overlay)
      return (!e.innerHTML.includes('ng-hide') && !e.innerHTML.includes('overlay'))
    });
    const unreadConversations = filteredConversations.length;

    // set Ferdium badge
    Ferdium.setBadge(unreadConversations);
  };

  Ferdium.loop(getMessages);
};
