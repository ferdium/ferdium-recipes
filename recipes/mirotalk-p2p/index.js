"use strict";

module.exports = Ferdium => class MiroTalkP2P extends Ferdium {
	overrideUserAgent() {
		return window.navigator.userAgent.replace(/(Ferdium|Electron)(\S+\s)/g, '').trim();
	}
};
