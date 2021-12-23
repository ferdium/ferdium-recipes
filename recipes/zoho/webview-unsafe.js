//wait for Ferdi and Zoho Mail to initialize
if (
    Object.prototype.hasOwnProperty.call(window, "ferdi") &&
    Object.prototype.hasOwnProperty.call(window.ferdi, "setBadge") &&
    Object.prototype.hasOwnProperty.call(window, "zmNCenter") &&
    Object.prototype.hasOwnProperty.call(window, "zmfolAction")
) {
    var unreadNotifications = window.zmNCenter.counter.count(); //General Notifications by Zoho (Bell Icon)
    var unreadMail = window.zmfolAction.getUnreadViewCount(); //Unread messages count

    window.ferdi.setBadge(unreadMail, unreadNotifications);
}