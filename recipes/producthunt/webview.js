module.exports = (Ferdi) => {
  const getMessages = function getMessages() {
    Ferdi.setBadge(document.querySelector('[class*=header_] [class*=content_] [class*=actions_] [class*=notificationsButton_]').innerText)
  }

  Ferdi.loop(getMessages)
}
