function instrumenEnvironment(webview) {
  webview.executeJavaScript(`
    (function() {
        if(window.electron) {
            return;
         }
        
        window.electron = { };
    })();
  `);
}
module.exports = (Franz) =>
  class Telegram extends Franz {
    // https://www.electronjs.org/docs/latest/api/webview-tag/#dom-events
    events = {
      "load-commit": "loadCommit",
    };
    loadCommit(event) {
      instrumenEnvironment(event.target);
    }
  };
