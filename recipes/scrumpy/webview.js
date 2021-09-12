module.exports = Ferdi => {
	const getMessages = function getMessages() {
		const notifications = document.querySelector('.c-notifications-dropdown__count')
		Ferdi.setBadge(notifications.innerText);
	};

	Ferdi.loop(getMessages);
};
