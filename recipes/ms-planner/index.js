module.exports = Ferdium =>
  class Planner extends Ferdium {
    overrideUserAgent() {
      return window.navigator.userAgent
        .replace(/(Ferdium|Electron)(\S+\s)/g, '')
        .replace(/(Chrome\/)([^ ]*)/g, '$163.0.3239.84');
    }

    // https://docs.microsoft.com/en-us/microsoftteams/troubleshoot/teams-sign-in/sign-in-loop#resolution
    knownCertificateHosts() {
      return ['tasks.office.com'];
    }

    // we need to allow all cookies for ms teams
    onHeadersReceived(details, callback) {
      if (
        details.responseHeaders &&
        details.responseHeaders['Set-Cookie'] &&
        details.responseHeaders['Set-Cookie'].length > 0 &&
        !details.responseHeaders['Set-Cookie'][0].includes('SameSite=none')
      ) {
        details.responseHeaders['Set-Cookie'][0] =
          `${details.responseHeaders['Set-Cookie'][0]}; SameSite=none`;
      }
      callback({ cancel: false, responseHeaders: details.responseHeaders });
    }
  };
