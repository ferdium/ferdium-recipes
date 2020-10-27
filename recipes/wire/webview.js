module.exports = (Ferdi) => {
	function getMessages() {
		let direct = 0;
		let indirect = 0;

		// Count how many people/groups have texted you
		const conversationElems = document.querySelectorAll('[data-uie-name="conversation-folder-badge"]');
		if (conversationElems) {
			for (const conversationElem of conversationElems) {
				const count = parseInt(conversationElem.innerText);
				if (count) {
					direct += count;
				}
			}
		}

		// Count unread pending user requests
		const pendingElem = document.querySelector('[data-uie-name="item-pending-requests"]');
		if (pendingElem) {
			const matches = pendingElem.innerText.match(/^([1-9][0-9]*)/);
			if (matches && matches.length > 0) {
				indirect += parseInt(matches[1]);
			}
		}

		// Alternative would be to count all messages (unread conversation count + pending) from the header
		// const titleElem = document.querySelector('head title');
		// const matches = titleElem.innerText.match(/^\(([1-9][0-9]*)\)/);
		// if (matches) {
		// 	direct = matches[1];
		// }

		Ferdi.setBadge(direct, indirect);
	}

	Ferdi.loop(getMessages);

};
