// Wait for Ferdium to initialize
if (window.ferdium?.setBadge !== undefined) {
  window.ferdium.setBadge(
    window.ferdium.safeParseInt(window.zmfolAction?.getUnreadViewCount()),
    window.ferdium.safeParseInt(
      window.zmTopBar?.topBandElements()?.notification?.children
        ?.notificationBadge?.textContent,
    ),
  );
}
