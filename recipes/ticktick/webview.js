module.exports = (Franz) => {
  const getMessages = function getMessages() {
//all overdue items are being counted
    const count = document.querySelectorAll('.duedate-overdue').length;

    Franz.setBadge(count);
	
  };
  Franz.loop(getMessages);
};
