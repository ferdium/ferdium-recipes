# Ferdi Recipe Documentation / Overview

Recipes are responsible for providing the connection between the service itself (e.g. WhatsApp) and Ferdi, providing information like the number of current notifications or handling dark mode.

A Ferdi recipe is basically nothing else than a node module and is currently initialized on `dom-ready`. You access all of the [electron](http://electron.atom.io) modules as well.


## Table of Contents
* [Installation](#user-content-installation)
* [Plugin structure](#user-content-recipe-structure)
* [Configuration (package.json)](#user-content-packagejson)
* [Backend (index.js)](#user-content-indexjs)
* [Frontend (webview.js)](#user-content-webviewjs)
* [Icons](#user-content-icons)
* [Dark Mode](#user-content-dark-mode)
* [Debugging](#user-content-debugging)
* [Deployment](#user-content-deployment)

## Installation
1. To install a new recipe for testing, download the recipe folder e.g `whatsapp` or simply create an empty one with the name of your new recipe (we recommend using a recipe like `whatsapp` as a template though).
2. Open the development Ferdi Plugins folder on your machine (note that the `dev` directory may not exist yet, and you must create it):
  * Mac: `~/Library/Application Support/Ferdi/recipes/dev/`
  * Windows: `%appdata%/Ferdi/recipes/dev/`
  * Linux: `~/.config/Ferdi/recipes/dev`
3. Copy the recipe folder into this folder
4. Reload Ferdi (`CMD/CTRL + SHIFT + R`)

## Recipe structure
Every recipe needs a specific file structure in order to work as a Ferdi recipe

* icon.svg - Icon for the service in SVG form
* icon.png - Icon for the service in PNG form (1024x1024px)
* index.js - Backend script, this script is NOT included in the service webview but only in Ferdi itself
* package.json - Information about the recipe
* webview.js - Frontend script, this script is injected into the service itself but still has access to all NodeJS APIs
* darkmode.css - CSS File that gets included when dark mode is activated

### package.json
The package.json is structured like any other node module and allows to completely configure the service.

```json
{
  "id": "tweetdeck",
  "name": "Tweetdeck",
  "version": "1.0.1",
  "description": "Tweetdeck",
  "main": "index.js",
  "author": "Stefan Malzner <stefan@adlk.io>",
  "license": "MIT",
  "repository": "https://github.com/meetfranz/recipe-tweetdeck",
  "config": {
    "serviceURL": "https://tweetdeck.twitter.com/"
  }
}
```

To get more information about all the provided configuration flags, check the [config docs](configuration.md).

Please note that the fields `id`, `name`, `version` and `config` and required.


### index.js
This is your "backend" code. Right now the options are very limited and most of the services don't need a custom handling here. If your service is relatively straight forward and has a static URL eg. _messenger.com_, _`[TEAMID]`.slack.com_ or _web.skype.com_ all you need to do to return the Ferdi Class:

```js
module.exports = Ferdi => Ferdi;
```

If your service can be hosted on custom servers, you can validate the given URL to detect if it's your server and not e.g. google.com. To enable validation you can override the function `validateServer`
```js
// RocketChat integration
module.exports = Ferdi => class RocketChat extends Ferdi {
  async validateUrl(url) {
    try {
      const resp = await window.fetch(`${url}/api/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await resp.json();

      return Object.hasOwnProperty.call(data, 'version');
    } catch (err) {
      console.error(err);
    }

    return false;
  }
};
```

`validateServer` needs to return a [`Promise`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), otherwise validation will fail.

### webview.js
The webview.js is the actual script that will be loaded into the webview. Here you can do whatever you want to do in order perfectly integrate the service into Ferdi. For convenience, we have provided a very simple set of functions to set unread message badges (`Ferdi.setBadge()`) and inject CSS files (`Ferdi.injectCSS()`).


```js
// orat.io integration
module.exports = (Ferdi) => {
  function getMessages() {
    let direct = 0;
    let indirect = 0;
    const FerdiData = document.querySelector('#FerdiMessages').dataset;
    if (FerdiData) {
      direct = FerdiData.direct;
      indirect = FerdiData.indirect;
    }

    Ferdi.setBadge(direct, indirect);
  }

  Ferdi.loop(getMessages);
}
```

To get more information about the provided functions, check the [API docs](frontend_api.md).

### Icons
In order to show every service icon crystal clear within the Ferdi UI, we require a .svg and .png in 1024x1024px.

### Dark Mode
You can provide a custom Dark Mode Theme for your recipes just by putting the `darkmode.css` into your recipe folder. Once the `darkmode.css` exists, you can enable the Dark Mode in your service settings.

Recipe Dark Mode is only supported by Ferdi 5.0.0-beta.19+

### Debugging
In order to debug your service integration, open Ferdi and use the shortcut `Cmd/Ctrl+Alt+Shift+i` to open the recipes developer tools.

### Publishing
Ferdi uses its recipe repository at <https://github.com/getferdi/recipes> to publish recipes to all clients.

To add your own recipe to the repository:
- If you already uploaded the recipe to GitHub:
  1. Fork https://github.com/getferdi/recipes and clone it to your computer
  2. Open a terminal in the `scripts/` folder of that repository
  3. Run `yarn install` to install all dependencies
  4. Run `yarn github [GitHub URL]`, e.g. `yarn github https://github.com/vantezzen/franz-recipe-standardnotes`, to add your new recipe
  5. Create a PR to <https://github.com/getferdi/recipes> with your new changes

- If you don't have it uploaded it GitHub:
  ℹ️ We recommend uploading your recipes to GitHub before adding them to provide a platform for users to report issues.
  1. Fork https://github.com/getferdi/recipes and clone it to your computer
  2. Copy your recipe files into `scripts/recipe_src`
  3. Open a terminal at `scripts/`
  4. Run `yarn install` to install all dependencies
  5. Run `yarn package` to package your new recipe
  6. Create a PR to <https://github.com/getferdi/recipes> with your new changes
