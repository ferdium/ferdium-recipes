// monkey patch to make notifications work properly on electron
window.ServiceWorkerRegistration.prototype.showNotification = function (
  title,
  options,
) {
  // passing all of options causes notifications to only appear sometimes
  // but the only option that actually matters is body
  new Notification(title, { body: options.body });
};
