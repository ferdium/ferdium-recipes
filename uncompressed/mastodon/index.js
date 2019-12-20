//'use strict';

module.exports = Franz => class Mastodon extends Franz {

  constructor(...args) {
    let _temp;
    //
    let serviceCache = {};
    // send service store for webview
    setInterval(() => {
      if (!window.franz) { // not present(near equal not initialize)
        return;
      }
      const services = window.franz.stores.services;
      // filter this recipe class
      const instancedServices = services.all.filter(service => service.recipe.constructor === this.constructor);
      // send 
      instancedServices.forEach(service => {
        let updated = false;
        serviceCache[service.id] = Object.keys(service).reduce((r, key) => {
          if (!service[key] || Object !== service[key].constructor) {
            updated = updated || serviceCache[key] !== service[key];
            r[key] = service[key];
          }
          return r;
        }, serviceCache[service.id] || {});
        if (updated) {
          service.webview.send('-service-update', service);
        }
      });
    }, 1000);
    return _temp = super(...args), this.events = {
    }, _temp;
  }

  async validateUrl(url) {
    try {
      const res = await window.fetch(`${url}/api/v1/instance/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      // check url field in API response
      return Object.hasOwnProperty.call(data, 'uri');
    } catch (err) {
      console.error(err);
    }
    return false;
  }

};
