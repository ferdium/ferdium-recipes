function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    const DB_NAME = 'FluffyChat web';
    const STORE_NAME = 'box_rooms';
    const request = window.indexedDB.open(DB_NAME);

    request.onsuccess = event => {
      // Database opened successfully
      const db = event.target.result;

      try {
        if (db.objectStoreNames.contains(STORE_NAME)) {
          const transaction = db.transaction([STORE_NAME], 'readonly');
          const store = transaction.objectStore(STORE_NAME);
          const roomsRequest = store.getAll();

          roomsRequest.onsuccess = () => {
            const rooms = roomsRequest.result;
            let notificationCount = 0;
            let notificationCountRooms = 0;
            // let highlightCount = 0;
            // let highlightCountRooms = 0;

            for (const room of rooms) {
              /**
               * It seems that this function is not fully implemented in fluffy
               * According to app settings, this field should count @mentions but doesn't
               **/
              // if (room.highlight_count && room.highlight_count > 0) {
              //   highlightCount += Ferdium.safeParseInt(room.highlight_count);
              //   highlightCountRooms += 1;
              // }

              if (room.notification_count && room.notification_count > 0) {
                notificationCount += Ferdium.safeParseInt(
                  room.notification_count,
                );
                notificationCountRooms += 1;
              }
            }

            // Ferdium.setBadge(highlightCount, notificationCount);

            /**
             * IMPORTANT: Because the hightlight_count (Ferdium equivalent: directMessages) is broken
             * this uses Ferdium.setBadge(perRoomNotifications, perMessageNotifications) to simulate how
             * FluffyChat Web shows it's badges and allow the user to get either room count or message count.
             **/
            Ferdium.setBadge(notificationCountRooms, notificationCount);

            /**
             * TODO: In the future there could be a toggle available under
             * "Settings > Unread message badges" to allow the user
             * to opt for "Count every room / chat only once"
             **/
            // Ferdium.setBadge(highlightCountRooms, notificationCountRooms);
          };
        }
      } catch {
        // console.log('Error while accessing FluffyChat IndexedDB content.');
      }

      db.close();
    };
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
