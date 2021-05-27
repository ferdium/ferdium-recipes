const interval = setInterval(() => {
  if (!window.O || !window.O.WindowController) return;
  window.O.WindowController.openExternal = function (href) {
    const temp = document.createElement('a');
    temp.setAttribute('href', href);
    temp.setAttribute('target', '_blank');
    temp.click();
  };
  clearInterval(interval);
}, 200);
