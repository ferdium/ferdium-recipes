const PUSHSTATE_NORMAL = 0;
const PUSHSTATE_THROTTLE = 1;
// const PUSHSTATE_DISABLE = 2;

const PUSHSTATE_THROTTLE_THRESHOLD = 1;

window.shPushState = window.history.pushState;
// window.pushStateBehavior = PUSHSTATE_NORMAL;
window.pushStateBehavior = PUSHSTATE_THROTTLE;
window.pushStateCount = 0;

function pushStateThrottled() {
  if (window.pushStateCount < PUSHSTATE_THROTTLE_THRESHOLD) {
    window.shPushState.apply(window.history, arguments);
    window.pushStateCount++;

    if (window.pushStateCount == PUSHSTATE_THROTTLE_THRESHOLD)
      setTimeout(() => {
        window.pushStateCount = 0;
      }, 5000);
  } else {
    // eslint-disable-next-line no-console
    console.log('Pushstate temporarily blocked!');
  }
}

function pushStateOneShot() {
  window.shPushState.apply(window.history, arguments);

  window.history.pushState = function () {};

  // eslint-disable-next-line no-console
  console.log('Pushstate Disabled!');
}

if (window.pushStateBehavior != PUSHSTATE_NORMAL) {
  window.history.pushState =
    window.pushStateBehavior == PUSHSTATE_THROTTLE
      ? pushStateThrottled
      : pushStateOneShot;
}
