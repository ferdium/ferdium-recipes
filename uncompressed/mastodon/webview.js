//'use strict';

const { ipcRenderer } = require('electron');

const BADGE_AUTO_CLEAR_DELAY = 10000; // delay time for badge clear auto

// MONKEY PATCH:
//   fix 'Uncaught TypeError: c.addEventListener is not a function'
//   from mastdon code
//   see https://github.com/tootsuite/mastodon/blob/c1a41181c52216de9ebeecebf418e6d50172139b/app/javascript/mastodon/actions/notifications.js#L60
if (!Notification.prototype.addEventListener) {
  Notification.prototype.addEventListener = function(){};
}

module.exports = (Franz, service_) => {

  let service = service_;

  // save service instance identify 
  const serviceId = service.id; 

  // check if this service is active
  let activeUpdated = false;
  let isActive      = service.isActive;

  ipcRenderer.on('-service-update', (sender, serviceNew) => {
    service = serviceNew;
    !activeUpdated && (activeUpdated = isActive != service.isActive);
    isActive = service.isActive;
  });

  //ipcRenderer.on('settings-update', (sender, settings) => {
  //  const nextIsActive = serviceId == settings.activeService;
  //  !activeUpdated && (activeUpdated = isActive != nextIsActive);
  //  isActive = nextIsActive;
  //});

  let replyCount = 0;
  let limitBadgeClear = false;

  const getMessages = function getMessages() {
    const activeUpdated_ = activeUpdated; activeUpdated = false;

    // check and redirect to signin page when not loggdin  
    if (window.location && /\/about$/.test(window.location.pathname)) {
      const hasSigninLink = !!document.querySelector('[href$="/auth/sign_in"]');
      if (hasSigninLink) {
        window.location.pathname = '/auth/sign_in';
        return;
      }
    }

    // clear replay badge when ...
    if (replyCount) {
      // this service actived
      if (activeUpdated_ && isActive) {
        replyCount = 0;
      }
      // timeout
      if (!isActive && limitBadgeClear) {
        limitBadgeClear = false;
      }
      if (isActive && false !== limitBadgeClear && limitBadgeClear <= Date.now()) {
        replyCount = 0;
        limitBadgeClear = false;
      }
    }

    Franz.setBadge(replyCount);
  };

  Franz.loop(getMessages);

  Franz.onNotify(notification => {
    // increment reply count for badge
    ++replyCount;
    limitBadgeClear = Date.now() + BADGE_AUTO_CLEAR_DELAY;
    //
    return notification;
  
  });
};