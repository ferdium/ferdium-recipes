"use strict";

module.exports = Franz => class CustomWebsite extends Franz {
  async validateUrl(url) {
    try {
      const resp = await window.fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return resp.status.toString().startsWith('2') || resp.status.toString().startsWith('3');
    } catch (err) {
      console.error(err);
    }

    return false;
  }

};