module.exports = Ferdi => class MicrosoftTeams extends Ferdi {
  overrideUserAgent() {
    return window.navigator.userAgent.replace(/(Ferdi|Electron)\/\S+ \([^)]+\)/g, '').trim();
  }

  // https://docs.microsoft.com/en-us/microsoftteams/troubleshoot/teams-sign-in/sign-in-loop#resolution
  knownCertificateHosts() {
    return [
      'microsoft.com',
      'microsoftonline.com',
      'teams.skype.com',
      'teams.microsoft.com',
      'sfbassets.com',
      'skypeforbusiness.com',
    ];
  };
};
