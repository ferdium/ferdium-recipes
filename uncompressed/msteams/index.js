"use strict";

module.exports = Franz => class MicrosoftTeams extends Franz {
  overrideUserAgent() {
    return window.navigator.userAgent.replace(/(Ferdi|Electron)\/\S+ \([^)]+\)/g, '').replace(/(Chrome\/)([^ ]*)/g, '$163.0.3239.84');
  }

};