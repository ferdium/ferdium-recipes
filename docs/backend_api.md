# Backend API

Provides a set of helper functions to integrate the recipe into [Ferdi](https://getferdi.com).

## Ferdi Backend Class Methods
* [validateUrl](#user-content-validateurl)
* [overrideUserAgent](#user-content-overrideuseragent)

## Events
* [webview events](#user-content-events)

### validateUrl(URL)
Validate if the given URL is a valid service instance.  

#### Arguments
1. `string` URL

#### Returns
[`Promise`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

#### Usage

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

### overrideUserAgent()
Override the user agent used inside the service webview.  

#### Returns
`String`

#### Usage

```js
module.exports = Ferdi => class Discord extends Ferdi {
  overrideUserAgent() {
    // Remove Ferdi's signature from the user agent
    return window.navigator.userAgent.replace(
    /(Ferdi|Electron)\/\S+ \([^)]+\)/g,
    ""
  );
  }
};
```

```js
module.exports = Ferdi => class Example extends Ferdi {
  overrideUserAgent() {
    // Use a completely different user agent
    return "Mozilla/2.02Gold (Win95; I)";
  }
};
```


### Events
Ferdi recipes can hook into the [electron webview events](https://electron.atom.io/docs/api/webview-tag/#dom-events) to trigger custom functions.

This is necessary for services like TweetDeck where custom URL forwarding is needed during login.

#### Usage
```js
module.exports = Ferdi => class Tweetdeck extends Ferdi {
  events = {
    'did-get-redirect-request': '_redirectFix',
  }

  _redirectFix(event) {
    if (event.newURL !== undefined && event.oldURL !== undefined && event.isMainFrame) {
      if (event.isMainFrame) {
        setTimeout(() => this.send('redirect-url', event.newURL), 100);
        event.preventDefault();
      }
    }
  }
};
```
