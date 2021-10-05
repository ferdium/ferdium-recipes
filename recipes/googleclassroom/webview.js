module.exports = Ferdi => {
  const getMessages = () => {
    let homework = 0;
    const upcomingAssignment = document.querySelectorAll('.hrUpcomingAssignmentGroup');
    if (upcomingAssignment.length > 0) {
      let i;
      for (i = 0; i < upcomingAssignment.length; i++) {
        homework += upcomingAssignment[i].childElementCount;
      }
    }
    Ferdi.setBadge(homework);
  };

  Ferdi.loop(getMessages);
};
