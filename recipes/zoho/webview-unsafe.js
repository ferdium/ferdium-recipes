//wait for Ferdium and Zoho Mail to initialize
if (
    Object.prototype.hasOwnProperty.call(window, "ferdium") &&
    Object.prototype.hasOwnProperty.call(window.ferdium, "setBadge") &&
    Object.prototype.hasOwnProperty.call(window, "zmNCenter") &&
    Object.prototype.hasOwnProperty.call(window, "zmfolAction")
) {
    var unreadNotifications = window.zmNCenter.counter.count(); //General Notifications by Zoho (Bell Icon)
    var unreadMail = window.zmfolAction.getUnreadViewCount(); //Unread messages count

    window.ferdium.setBadge(unreadMail, unreadNotifications);
}
