// only try to update badge once Ferdium API has finished loading
if (window.ferdium != undefined && window.ferdium.setBadge != undefined) {
  var timerRunning = (window.toggl != undefined) && !!(window.toggl.store.getState().view.timer.timeEntry.start);

  // Treat running timer as a "non-direct" notification (default blue dot instead of urgent red "1")
  window.ferdium.setBadge(0, timerRunning ? 1 : 0);
}
