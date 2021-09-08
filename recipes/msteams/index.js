module.exports = Ferdi => class MicrosoftTeams extends Ferdi {
  overrideUserAgent() {
    return window.navigator.userAgent.replace(/(Ferdi|Electron)\/\S+ \([^)]+\)/g, '').trim();
  }

  // https://docs.microsoft.com/en-us/microsoftteams/troubleshoot/teams-sign-in/sign-in-loop#resolution
  // https://docs.microsoft.com/en-us/microsoft-365/enterprise/urls-and-ip-address-ranges?view=o365-worldwide#skype-for-business-online-and-microsoft-teams
  knownCertificateHosts() {
    return [
      'aka.ms',
      'aspnetcdn.com',
      'azure.net',
      'azureedge.net',
      'live.com',
      'microsoft.com',
      'microsoftonline.com',
      'msecnd.net',
      'msedge.net',
      'mstea.ms',
      'office.net',
      'okta.com',
      'sfbassets.com',
      'skype.com',
      'skypeassets.com',
      'skypeforbusiness.com',
      'tenor.com',
      'windows.com',
      'windows.net',
    ];
  };
};
