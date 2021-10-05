module.exports = Ferdi => {
  const getNotifications = function getNotifications() {
    let count = 0;

    const elements = [
      document.querySelector('#requestsCountValue'),
      // document.getElementById('mercurymessagesCountValue'),
      document.querySelector('#notificationsCountValue'),
      document.querySelector(
        '.k4urcfbm.qnrpqo6b.qt6c0cv9.jxrgncrl.jb3vyjys.taijpn5t.datstx6m.pq6dq46d.ljqsnud1.bp9cbjyn',
      ),
    ];

    for (const element of elements) {
      if (element !== null) {
        count += Ferdi.safeParseInt(element.textContent);
      }
    }

    Ferdi.setBadge(count);
  };

  Ferdi.loop(getNotifications);
};
