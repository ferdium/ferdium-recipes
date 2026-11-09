// Rool's web app does not raise browser notifications, and it does not put an
// unread count in the page title, so there is nothing to mirror into a badge
// yet. When Rool adds either, wire it up here:
//
//   const getMessages = () => { ... ; Ferdium.setBadge(direct, indirect); };
//   Ferdium.loop(getMessages);
module.exports = Ferdium => Ferdium;
