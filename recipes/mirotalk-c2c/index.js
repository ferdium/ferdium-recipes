"use strict";

module.exports = Ferdium => class MiroTalkC2C extends Ferdium {
	overrideUserAgent() {
		return window.navigator.userAgent.replace(/(Ferdium|Electron)(\S+\s)/g, '').trim();
	}
};
