module.exports = (Ferdi) => {
  const getMessages = () => {
    Ferdi.setBadge(document.querySelector('[class*=header_] [class*=content_] [class*=actions_] [class*=notificationsButton_]').innerText)
  }

  Ferdi.loop(getMessages)
}
