module.exports = (Ferdium) => {
    Ferdium.loop(() => {
        // FIXME: Don't assume 0th element exists
        const notifications = document.querySelectorAll("[href$=notifications]")[0].outerText;
        let parsedValue = Ferdium.safeParseInt(notifications);

        Ferdium.setBadge(parsedValue);
    });
}
