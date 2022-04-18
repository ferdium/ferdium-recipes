module.exports = Ferdium => class MicrosoftTeams extends Ferdium {
  overrideUserAgent() {
    return window.navigator.userAgent.replace(/(Ferdium|Electron)\/\S+ \([^)]+\)/g, '').trim();
  }

  // TODO: Commenting out since this can expose the user to a MITM attack. Before this can be turned on, we will need to put in some safeguards/warnings that the user can explicitly accept the security ramifications
  // // https://docs.microsoft.com/en-us/microsoftteams/troubleshoot/teams-sign-in/sign-in-loop#resolution
  // knownCertificateHosts() {
  //   return [
  //     'microsoft.com',
  //     'microsoftonline.com',
  //     'teams.skype.com',
  //     'teams.microsoft.com',
  //     'sfbassets.com',
  //     'skypeforbusiness.com',
  //   ];
  // };
};
