module.exports = Ferdi => {
  const getMessages = () => {
    const events = document.querySelectorAll(".today")[0].querySelectorAll('.list')[0].querySelectorAll('.task-list')[0].querySelectorAll('.event-section')[0].querySelectorAll('.droppable')[0].children[0].childElementCount
    const tasks = document.querySelectorAll(".today")[0].querySelectorAll('.list')[0].querySelectorAll('.task-list')[0].querySelectorAll('.task-section')[0].querySelectorAll('.droppable')[0].children[0].childElementCount

    Ferdi.setBadge(events + tasks);
  };

  Ferdi.loop(getMessages);
}
