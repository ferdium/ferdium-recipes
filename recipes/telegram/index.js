// https://github.com/Ajaxy/telegram-tt/blob/8fc3df855df4a1d9914e90e9e4ac8c85c2d3dd61/src/util/notifications.ts#L484
// https://github.com/Ajaxy/telegram-tt/blob/8fc3df855df4a1d9914e90e9e4ac8c85c2d3dd61/src/util/notifications.ts#L50-L51
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
