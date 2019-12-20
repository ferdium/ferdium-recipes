"use strict";

var _electron = require("electron");

const {
  BrowserWindow
} = _electron.remote;

module.exports = (Franz, settings) => {
  const getMessages = function getMessages() {
    let count = 0;
    const container = document.querySelector('[role="tablist"] > [title="Chats"] > div');

    if (container) {
      const children = container.children;

      if (children.length === 3) {
        const elementContainer = children[children.length - 1];

        if (elementContainer) {
          const element = elementContainer.querySelector('[data-text-as-pseudo-element]');
          count = parseInt(element.dataset.textAsPseudoElement, 10);
        }
      }
    }

    Franz.setBadge(count);
  };

  Franz.loop(getMessages);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="http"]');
    const button = event.target.closest('button[title^="http"]');

    if (link || button) {
      const url = link ? link.getAttribute('href') : button.getAttribute('title');
      event.preventDefault();
      event.stopPropagation();

      if (url.includes('views/imgpsh_fullsize_anim')) {
        let win = new BrowserWindow({
          width: 800,
          height: window.innerHeight,
          minWidth: 600,
          webPreferences: {
            partition: `persist:service-${settings.id}`
          }
        });
        win.loadURL(url);
        win.on('closed', () => {
          win = null;
        });
      } else {
        window.open(url);
      }
    }
  }, true);
};