module.exports = Ferdium => {
  // if the user is on googleclassroom landing page, go to the login page.
  if (
    location.hostname == 'edu.google.com' &&
    location.href.includes('workspace-for-education/classroom/')
  ) {
    location.href =
      'https://accounts.google.com/AccountChooser?continue=https://classroom.google.com/u/0/';
  }

  const getMessages = () => {
    let homework = 0;
    const upcomingAssignment = document.querySelectorAll('.hrUpcomingAssignmentGroup');
    if (upcomingAssignment.length > 0) {
      let i;
      for (i = 0; i < upcomingAssignment.length; i++) {
        homework += upcomingAssignment[i].childElementCount;
      }
    }
    Ferdium.setBadge(homework);
  };

  Ferdium.loop(getMessages);
};
