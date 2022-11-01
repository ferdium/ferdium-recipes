module.exports = (Ferdium) => {
  const getMessages = () => {
    let msgRaw = document.title.match(/\(\d*\)/);
    let messages = 0;

    if (msgRaw) {
      messages = parseInt(msgRaw[0].substring(1));
    }
    
    Ferdium.setBadge(messages, 0);
  }

  Ferdium.loop(getMessages);
};