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
module.exports = Ferdium =>
  class Telegram extends Ferdium {
    // https://www.electronjs.org/docs/latest/api/webview-tag/#dom-events
    get events() {
      return {
        'load-commit': 'loadCommit',
      };
    }

    loadCommit(event) {
      instrumenEnvironment(event.target);
    }
  };
