module.exports = Ferdium => {
  const getMessages = () => {
    const { title } = document;
    const regex = /\d+/;
    Ferdium.setBadge(regex.test(title) ? Number(regex.exec(title)[0]) : 0);
  };

  Ferdium.loop(getMessages);
};
