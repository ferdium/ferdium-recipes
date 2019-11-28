'use strict'

module.exports = Franz => class Instagram extends Franz {
  overrideUserAgent() {
    return 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1'
  }
}