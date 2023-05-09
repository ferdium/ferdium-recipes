"use strict";

module.exports = Ferdium => class MiroTalkWEB extends Ferdium {
	overrideUserAgent() {
		return window.navigator.userAgent.replace(/(Ferdium|Electron)(\S+\s)/g, '').trim();
	}
};
