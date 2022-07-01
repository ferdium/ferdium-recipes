module.exports = Ferdium => {
    const getMessages = function getMessages() {
        const notificationsCounter = document.querySelector('.js-notificationsCounter');
        const count = Number.parseInt(notificationsCounter.textContent, 10);

        Ferdium.setBadge(count);
    };

    Ferdium.loop(getMessages);
};
