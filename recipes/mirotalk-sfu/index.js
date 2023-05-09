"use strict";

module.exports = Ferdium => class MiroTalkSFU extends Ferdium {
	overrideUserAgent() {
		return window.navigator.userAgent.replace(/(Ferdium|Electron)(\S+\s)/g, '').trim();
	}
};
