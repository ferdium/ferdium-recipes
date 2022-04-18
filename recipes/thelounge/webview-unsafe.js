// Monkey patch ServiceWorker.postMessage so that it will actually post a notification in Ferdium:

function newPostMessage(options) {
  window.ferdium.displayNotification(options.title, options);
}

ServiceWorker.prototype.postMessage = newPostMessage;
