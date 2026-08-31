function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = (Ferdium) => {
  let count = 0;

  const getMessages = async () => {
    // Since we're making an API request to obtain unreads,
    // only check once every five seconds 
    count = (count + 1) % 5;
    if (count > 0) return;

    // read active profile info from LocalStorage
    const profileData = localStorage.getItem('profileData');
    const {profile, profiles} = JSON.parse(profileData);
    const {instance, jwt} = profiles.find(({id}) => id === profile);

    // obtain unread count from user instance
    const response = await fetch(
      `https://${instance}/api/v3/user/unread_count`, {
      headers: {
        authorization: `Bearer ${jwt}`
      }
    });

    // parse response
    const { replies, mentions, private_messages } = await response.json();

    Ferdium.setBadge(private_messages + replies, mentions);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
