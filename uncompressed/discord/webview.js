"use strict";

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Franz => {
  const getMessages = function getMessages() {
    // Get direct messages
    const directElements = document.querySelectorAll('[class^="numberBadge-2s8kKX"]');
    var direct = 0;  

    directElements.forEach(function(directElement) {
      direct = direct + parseInt(directElement.innerHTML);
    });

    // Get indirect messages
    const linkElements = document.getElementsByTagName('link');
    var indirect = 0;
    
    for (var i = 0; i < linkElements.length; i++) {
      if(linkElements[i].getAttribute('rel') == 'icon') {
        if(linkElements[i].getAttribute('href') == 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEJ0lEQVRYR+2WXUybVRjHf20ptLBSx8cqIKy1W2wlCnGiXjgzhS1ezEFNxAsV3BaXKDPGDTS6TTFzmwkwXdToJokiu5kfGUTj4saIu9AliAZM+FiywmAW+ZJRWim0tK95G1qotPTtILvy3LzJe/7P8/+f5+scGfPrqa8ERc5g7wEEXgFSAv9X+TuBjBODOaYjX5fKvKJvWYBgf23vQQTh8CoThncnkx2qqzS9GyqgpmccSL0lAuDvuipz2n8FCLeI3E9TV2X2R38hBTU9/wuIGIHM9AQ25Wq5TaPENjpDZ+8UapWChHi5P5wzbh9uj4/N960lM13FwF8ufuuyMzQ2GzGrklKgSYzDUqRDlxrP8LjbT7g+Q+UnD7cc/8zRb3OhSpCTtU7F1cFpmi6O4JieWwKXJODZ7Zncs1HjN1YoguUiqVY9Hh9KpZyO3ilOfz8UuwCtJo4DezYgj413CZFPgCOnrmJ3hEYhagQefzidoodWZyxcuDzOjz+LY2ZhRRXw5gtGUrRKSeGOBpqwezj6mVW6ALHq95Ublviddfv4c2SGO3SqYAcEQM5pL6MTs+RkqIlTyHB3dBCfnx/0cbyhP6Qrlo3A5k0pFD+6LkSAa8bL8S+vcWPKw9pkJfvK9MFuGLvhpum1egyXz5LqHEI70B20VW3ZglKv5497d3DOaw7+X1aAWP35puQQAZ1XHDR+Zwv+e+6JLPLu0uCbnKSr5BmSLv0QLRO0bdtL+9aK6KNYDL+YhsVLPGXt5/14fQIKuYzKnQY0nb8wbLH4RUhd45lmzpV/SPWxosh3weG9G8MOm4EhF91WJ3cb15CdOMugwRATeUCkzfgAj1jbIguoqTQFbylxPrtcXhLVodNvuKSE6eZmqQcPh3vHCNVhb8OqnQZ0qQspEGd6T5+T9Rlq7sxOxNXcxIjFshJyv60cDGEFaJLiEAvRmJ0YJBEn2u/dds62jLD99Mvo2s+vWADwasT3gLhhNq7h/lwt+ky1PwX13173XzCl71tIG+oNKyCjpQV1YaF/z2uzMVpWhqu1NSxWgIabepC8VLXQz4s9p9fXo9m9O4TM093N9dzcSNHqiFlAmq2H0g+ejHr6AEBwOBirqMDZ2BjWJmYBopfVioAAl25KQPEnZWT1/Ro1CtFqADixWMA0oJZS2o+deQNTe5MUaDTMQhdU1vQ0CFAWzULcz7K2UfxpuRTochi7HPTBCLz+nlU7p3B/AxRJ8Vxw/iMKLnwsBRqpBS0boGnJg2t/7RWTTPDdLsXzroMF9QmzTqMU7GJMX24hW7suht4FsToR8f2g94FYDHlS7UXy1qePcuytB1cuIEBqhWrg7Sgi7M5k3YsNh356XgbbljxIpJ4gEm4+GiUC5MtAfIvlzfd5B3BNDl8YYHLPyXalZirpZF2VeZfo61+PD6XFPaCuOgAAAABJRU5ErkJggg==') {
          indirect = 1;
        }
      }
    }

    // Set badge
    Franz.setBadge(direct, indirect);
  };

  Franz.loop(getMessages);
  Franz.injectCSS(_path.default.join(__dirname, 'service.css'));
};
