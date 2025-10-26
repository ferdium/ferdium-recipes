function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  // Added: persist Google Classroom session data across Ferdium restarts
  Ferdium.setDefaultPartition('persist:google-classroom');

  // if the user is on googleclassroom landing page, go to the login page.
  if (
    location.hostname === 'edu.google.com' &&
    location.href.includes('workspace-for-education/classroom/')
  ) {
    location.href =
      'https://accounts.google.com/AccountChooser?continue=https://classroom.google.com/u/0/';
  }

  const getMessages = () => {
    let homework = 0;
    const upcomingAssignment = document.querySelectorAll(
      '.hrUpcomingAssignmentGroup',
    );
    if (upcomingAssignment.length > 0) {
      let i;
      for (i = 0; i < upcomingAssignment.length; i += 1) {
        homework += upcomingAssignment[i].childElementCount;
      }
    }
    Ferdium.setBadge(homework);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));

  // Added: keep Google OAuth/login inside Ferdium by overriding target="_blank" links
  const fixGoogleLinks = () => {
    const links = document.querySelectorAll('a[target="_blank"]');
    links.forEach(link => link.setAttribute('target', '_self'));
  };
  fixGoogleLinks();
  new MutationObserver(fixGoogleLinks).observe(document.body, {
    childList: true,
    subtree: true,
  });
};
