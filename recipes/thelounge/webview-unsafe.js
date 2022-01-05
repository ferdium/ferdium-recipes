// Monkey patch ServiceWorker.postMessage so that it will actually post a notification in Ferdi:

function newPostMessage(options) {
  window.ferdi.displayNotification(options.title, options);
}
  
ServiceWorker.prototype.postMessage = newPostMessage;
