// only try to update badge once Ferdi API has finished loading
if (ferdi != undefined && ferdi.setBadge != undefined) {
    var timerRunning = (window.toggl != undefined) && !!(window.toggl.store.getState().view.timer.timeEntry.start);

    if (timerRunning) {
        // Treat running timer as a "non-direct" notification (default blue dot instead of urgent red "1")
        ferdi.setBadge(0, 1);
    } else {
        ferdi.setBadge(0);
    }
}
