# Ferdium Recipe Documentation / Overview

Recipes are responsible for providing the connection between the service itself (e.g. WhatsApp) and Ferdium, providing information like the number of current notifications or handling dark mode.

A Ferdium recipe is basically nothing else than a node module and is currently initialized on `dom-ready`. You access all of the [electron](http://electron.atom.io) modules as well.

> ℹ️ New to Ferdium recipes and Electron? Then we recommend you read Jake Lee's ["Super simple guide to adding a new Ferdi service recipe"](https://blog.jakelee.co.uk/super-simple-guide-to-adding-a-new-ferdi-service-recipe/) which gives you an easy step-by-step guide on how to create and publish your recipe!

> ℹ️ If you have any problems packaging your recipes, if you are inexperienced with the tools used or have any other problems, we are here to help! Just open a new issue at https://github.com/ferdium/ferdium-recipes/issues/new and we can help you develop, test and publish your recipe

> If you want to update an existing recipe, please refer to [updating.md](https://github.com/ferdium/ferdium-recipes/blob/main/docs/updating.md) instead

## Table of Contents

- [Ferdium Recipe Documentation / Overview](#ferdium-recipe-documentation--overview)
  - [Table of Contents](#table-of-contents)
  - [Preparing](#preparing)
  - [Create a recipe](#create-a-recipe)
  - [Recipe structure](#recipe-structure)
    - [package.json](#packagejson)
    - [index.js](#indexjs)
    - [webview.js](#webviewjs)
  - [Icons](#icons)
  - [Dark Mode](#dark-mode)
  - [Debugging](#debugging)
  - [Publishing](#publishing)

## Preparing

You should have basic knowledge of JavaScript - don't worry, you'll really only need some basic commands as we've already prepared the complicated stuff for you.

We have also created a nice script that already does 50% of the work for you - yay 🎉. If you want to use this script, please make sure you have NodeJS installed on your system.

## Create a recipe

1. Fork this repository on GitHub. You can do this by clicking the "Fork" button in the top right corner
2. Clone your forked repository. Normally, you can do this by running `git clone https://github.com/<Your GitHub Username>/ferdium-recipes.git` in your terminal. You may also use a Git GUI or the GitHub Website for this.
3. (Optional, if you want to use our creation script) Install its dependencies via the terminal:

```Bash
pnpm i
```

4. (Optional - contd) You can now run our automatic recipe wizard that creates and opens the new recipe for you:

```Bash
# Make sure you are still in the repository's folder
pnpm run create "Service Name"
```

Replace `Service Name` with the name of your service, e.g. `pnpm run create "Google Hangouts"`.
This command will automatically create the development recipe in the correct folder, prepares it for your service and opens the new recipe in your file explorer or Finder. 5. Reload Ferdium (`CMD/CTRL + SHIFT + R`) in order for it to register the new recipe 6. You can now develop your recipe as described below. Please continue down below with "[Publishing](#Publishing)" after you are done creating your recipe.

5. (Mandatory) Please run the following step before raising a PR:
```Bash
pnpm i && pnpm lint:fix && pnpm reformat-files && pnpm package
```
Fix any issues that are reported.

## Recipe structure

Every recipe needs a specific file structure in order to work as a Ferdium recipe

- icon.svg - Icon for the service in SVG form (must be square)
- index.js - Backend script, this script is NOT included in the service webview but only in Ferdium itself
- package.json - Information about the recipe
- webview.js - Optional frontend script, this script is injected into the service itself but still has access to all NodeJS APIs
- darkmode.css - CSS File that gets included when dark mode is activated

### package.json

The `package.json` is structured like any other node module and allows to completely configure the service.

```json
{
  "id": "tweetdeck",
  "name": "Tweetdeck",
  "version": "1.0.0",
  "license": "MIT",
  "repository": "https://github.com/meetfranz/recipe-tweetdeck",
  "config": {
    "serviceURL": "https://tweetdeck.twitter.com/"
  }
}
```

To get more information about all the provided configuration flags, check the [config docs](configuration.md).

Please note that the fields `id`, `name`, `version` and `config` are mandatory.

### index.js

This is your "backend" code. Right now the options are very limited and most of the services don't need a custom handling here. If your service is relatively straight forward and has a static URL eg. _messenger.com_, _`[TEAMID]`.slack.com_ or _web.skype.com_ all you need to do to return the Ferdium Class:

```js
module.exports = Ferdium => Ferdium;
```

If your service can be hosted on custom servers, you can validate the given URL to detect if it's your server and not e.g. google.com. To enable validation you can override the function `validateServer`

```js
// RocketChat integration
module.exports = Ferdium =>
  class RocketChat extends Ferdium {
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

By default, Ferdium's user agent looks like this:

```text
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.141 Safari/537.36 Ferdium/5.4.4-beta.3 (Electron 8.1.1)
```

Some services may not be compatible with Ferdium adding it's signature to the user agent.

If you encounter such a service, please remove this signature with the following snippet of code

```js
overrideUserAgent() {
  return window.navigator.userAgent.replace(
    /(Ferdium|Electron)\/\S+ \([^)]+\)/g,
    ""
  );
}
```

If you want to change the user agent to a different one, you can simply return the String for the new user agent:

```js
overrideUserAgent() {
  return "Mozilla/2.02Gold (Win95; I)";
}
```

### webview.js

The optional `webview.js` is the actual script that will be loaded into the webview. Here you can do whatever you want to do in order perfectly integrate the service into Ferdium. For convenience, we have provided a very simple set of functions to set unread message badges (`Ferdium.setBadge()`), set active dialog title (`Ferdium.setDialogTitle()`) and inject CSS files (`Ferdium.injectCSS()`).

```js
// telegram integration
module.exports = Ferdium => {
  const getMessages = () => {
    let direct = 0;
    let indirect = 0;
    const elements = document.querySelectorAll('.rp');
    for (const element of elements) {
      const subtitleBadge = element.querySelector('.dialog-subtitle-badge');
      if (subtitleBadge) {
        const parsedValue = Ferdium.safeParseInt(subtitleBadge.textContent);
        if (element.dataset.peerId > 0) {
          direct += parsedValue;
        } else {
          indirect += parsedValue;
        }
      }
    }

    Ferdium.setBadge(direct, indirect);
  };

  const getActiveDialogTitle = () => {
    const element = document.querySelector('.top .peer-title');

    Ferdium.setDialogTitle(element ? element.textContent : '');
  };

  const loopFunc = () => {
    getMessages();
    getActiveDialogTitle();
  };

  Ferdium.loop(loopFunc);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
```

To get more information about the provided functions, check the [API docs](frontend_api.md).

## Icons

In order to show every service icon crystal clear within the Ferdium UI, we require the icon in .svg (square, 1024x1024px) format.

## Dark Mode

You can provide a custom Dark Mode Theme for your recipes just by putting the `darkmode.css` into your recipe folder. Once the `darkmode.css` exists, you can enable the Dark Mode in your service settings.

Recipe Dark Mode is only supported by Ferdium 5.0.0-beta.19+. Even then, certain services do not allow clients like Ferdium to override these styles (an example of this is google calendar).

## Debugging

In order to debug your service integration, open Ferdium and use the shortcut `Cmd/Ctrl+Alt+Shift+I` to open the recipes developer tools.

## Publishing

Ferdium uses its recipe repository at <https://github.com/ferdium/ferdium-recipes> to publish recipes to all clients.

Publishing your recipes to Ferdium is super easy! When you used our recipe creation script, we have created a folder for your recipe inside Ferdium's internal folders (the one that got automatically opened after you ran our script).

Simply copy that whole folder into the repositories "recipes" folder. You'll now need to push your changes to Git and create a Pull Request from your fork repository to our repository using the GitHub website.
