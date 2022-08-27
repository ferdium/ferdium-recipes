const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj)
{
	return obj && obj.__esModule ? obj :
	{
		default: obj
	};
}

module.exports = Ferdium =>
{
	const getMessages = () =>
	{
		let unreadCount = 0;
		for (const counterElement of document.querySelectorAll('.GCSDBRWBMXB'))
		{
			const unreadCounter = Ferdium.safeParseInt(counterElement.textContent);
			unreadCount = Math.max(unreadCount, unreadCounter);
		}

		Ferdium.setBadge(unreadCount);
	};
	Ferdium.loop(getMessages);

	Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};