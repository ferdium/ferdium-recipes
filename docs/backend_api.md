# Backend API

Provides a set of helper functions to integrate the recipe into [Ferdium](https://ferdium.org).

## Ferdium Backend Class Methods

* [validateUrl](#validateurl)
* [overrideUserAgent](#overrideuseragent)
* [modifyRequestHeaders](#modifyrequestheaders)
* [knownCertificateHosts](#knownCertificateHosts)

## Events

* [webview events](#events)

### validateUrl(URL)

Validate if the given URL is a valid service instance.

#### Arguments

1. `string` URL

#### Returns

[`Promise`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

#### Usage

```js
// RocketChat integration
module.exports = Ferdium => class RocketChat extends Ferdium {
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

### overrideUserAgent()

Override the user agent used inside the service webview.

#### Returns

`String`

#### Usage

```js
module.exports = Ferdium => class Discord extends Ferdium {
  overrideUserAgent() {
    // Remove Ferdium's signature from the user agent
    return window.navigator.userAgent.replace(
    /(Ferdium|Electron)\/\S+ \([^)]+\)/g,
    ""
  );
  }
};
```

```js
module.exports = Ferdium => class Example extends Ferdium {
  overrideUserAgent() {
    // Use a completely different user agent
    return "Mozilla/2.02Gold (Win95; I)";
  }
};
```

### modifyRequestHeaders()

Modify headers of HTTP requests sent from a recipe's webview
Any standard HTTP header can be added to the requests.

#### Returns

`Array` containing objects, each of which should have two properties.

* `headers` - Object containing the header params and their values in key-value format
* `requestFilters` - Array of URL patterns used to filter requests for which the headers need to be added.
Valid URL patterns can be referred from [here](https://www.electronjs.org/docs/api/web-request#webrequestonbeforerequestfilter-listener)

#### Usage

```js
// Hangouts Chat integration
module.exports = Ferdium => class HangoutsChat extends Ferdium {
    modifyRequestHeaders() {
      return [{
        // Adding an origin header for all http requests from this recipe
        headers: { 'origin': 'https://chat.google.com' },
        requestFilters: {
          urls: ['*://*/*']
        }
      }]
    }
};
```

### knownCertificateHosts()

Specify an array of known hosts from where certificates can be issued for this service

#### Returns

`Array` containing hostnames from where certificates can be issued

#### Usage

```js
// msteams Chat integration
module.exports = Ferdium => class MicrosoftTeams extends Ferdium {
  knownCertificateHosts() {
    return [
      'aka.ms',
      'aspnetcdn.com',
      'azure.net',
      'azureedge.net',
      'live.com',
      'microsoft.com',
      'microsoftonline.com',
      'msecnd.net',
      'msedge.net',
      'mstea.ms',
      'office.net',
      'okta.com',
      'sfbassets.com',
      'skype.com',
      'skypeassets.com',
      'skypeforbusiness.com',
      'tenor.com',
      'windows.com',
      'windows.net',
    ];
  };
};
```

### Events

Ferdium recipes can hook into the [electron webview events](https://electron.atom.io/docs/api/webview-tag/#dom-events) to trigger custom functions.

This is necessary for services like TweetDeck where custom URL forwarding is needed during login.

#### Usage

```js
module.exports = Ferdium => class Tweetdeck extends Ferdium {
  events = {
    'did-get-redirect-request': '_redirectFix',
  }

  _redirectFix(event) {
    if (event.newURL !== undefined && event.oldURL !== undefined && event.isMainFrame) {
      setTimeout(() => this.send('redirect-url', event.newURL), 100);
      event.preventDefault();
    }
  }
};
```
