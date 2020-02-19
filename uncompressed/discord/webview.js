"use strict";

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Franz => {
  const iconValues = [
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEJ0lEQVRYR+2WXUybVRjHf20ptLBSx8cqIKy1W2wlCnGiXjgzhS1ezEFNxAsV3BaXKDPGDTS6TTFzmwkwXdToJokiu5kfGUTj4saIu9AliAZM+FiywmAW+ZJRWim0tK95G1qotPTtILvy3LzJe/7P8/+f5+scGfPrqa8ERc5g7wEEXgFSAv9X+TuBjBODOaYjX5fKvKJvWYBgf23vQQTh8CoThncnkx2qqzS9GyqgpmccSL0lAuDvuipz2n8FCLeI3E9TV2X2R38hBTU9/wuIGIHM9AQ25Wq5TaPENjpDZ+8UapWChHi5P5wzbh9uj4/N960lM13FwF8ufuuyMzQ2GzGrklKgSYzDUqRDlxrP8LjbT7g+Q+UnD7cc/8zRb3OhSpCTtU7F1cFpmi6O4JieWwKXJODZ7Zncs1HjN1YoguUiqVY9Hh9KpZyO3ilOfz8UuwCtJo4DezYgj413CZFPgCOnrmJ3hEYhagQefzidoodWZyxcuDzOjz+LY2ZhRRXw5gtGUrRKSeGOBpqwezj6mVW6ALHq95Ublviddfv4c2SGO3SqYAcEQM5pL6MTs+RkqIlTyHB3dBCfnx/0cbyhP6Qrlo3A5k0pFD+6LkSAa8bL8S+vcWPKw9pkJfvK9MFuGLvhpum1egyXz5LqHEI70B20VW3ZglKv5497d3DOaw7+X1aAWP35puQQAZ1XHDR+Zwv+e+6JLPLu0uCbnKSr5BmSLv0QLRO0bdtL+9aK6KNYDL+YhsVLPGXt5/14fQIKuYzKnQY0nb8wbLH4RUhd45lmzpV/SPWxosh3weG9G8MOm4EhF91WJ3cb15CdOMugwRATeUCkzfgAj1jbIguoqTQFbylxPrtcXhLVodNvuKSE6eZmqQcPh3vHCNVhb8OqnQZ0qQspEGd6T5+T9Rlq7sxOxNXcxIjFshJyv60cDGEFaJLiEAvRmJ0YJBEn2u/dds62jLD99Mvo2s+vWADwasT3gLhhNq7h/lwt+ky1PwX13173XzCl71tIG+oNKyCjpQV1YaF/z2uzMVpWhqu1NSxWgIabepC8VLXQz4s9p9fXo9m9O4TM093N9dzcSNHqiFlAmq2H0g+ejHr6AEBwOBirqMDZ2BjWJmYBopfVioAAl25KQPEnZWT1/Ro1CtFqADixWMA0oJZS2o+deQNTe5MUaDTMQhdU1vQ0CFAWzULcz7K2UfxpuRTochi7HPTBCLz+nlU7p3B/AxRJ8Vxw/iMKLnwsBRqpBS0boGnJg2t/7RWTTPDdLsXzroMF9QmzTqMU7GJMX24hW7suht4FsToR8f2g94FYDHlS7UXy1qePcuytB1cuIEBqhWrg7Sgi7M5k3YsNh356XgbbljxIpJ4gEm4+GiUC5MtAfIvlzfd5B3BNDl8YYHLPyXalZirpZF2VeZfo61+PD6XFPaCuOgAAAABJRU5ErkJggg==',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEe0lEQVRYR+1XbUybVRR+3paWttjyvbLikI3hOom4yCLGOYYJwYWw6AwzI84tzsiUkGg2GPsQl2yMaegWySQbfmawH36RqWDc5kzExKmo6LaMgtJRKlQLlQbKKLSUeu+btfRd3/K+3ch+ef+0uee553l6zrnn3DK4sTZ97JOmWXr2w4eXyVaCf3+BP0fBoMGSpj/8ydOMl/pm/AS7DD2vwuc7tMCE/O4YpuZopb6WK6DeaCcbiXdEAPDv0aqVSTcL8N0hcpaGCGCjP5eCeuP/AsJGQJccjZysWMSpZRgansKlnnEoFVJEyyVsOKfcs3B7ZrH2wXjokhUY+NuFX6+OwToyHTarolKgVkVhY4EW2kQ5/rG7WcJ7FitYcr7lvD6D/iEXFNESpC5SoM8yic++scE5ORMCFyVgS7EO92eq2cNSaaBcRNWqh0REJpPgdxKt0+3WyAXEqqOwv2w5JJHxhhDNksQefrsPY05uFAQjsP7RZBQ8vDBt4esf7Dj3PW0zc0tQwL4XMpAQKxMVbiHQ6JgHde+YxAugVb9z29IQv9Ok2gdtU7hbqwjcAD9oYtKL4dFpLIkDfBYzfC4XJBoNZJmZLOTYqX7OrZg3AmtzEvDEY4s4AlxTXhxrNsMx7kG8RoadW9MDt2HE4cb5F48gvfMLLDZ3cc4xcjmUhYXoWf0k2mPWBGzzCqDVv0qv4Ti61OtES9tQYO/ZDal4YIUaUx0dMD9fDrmpWygTsOjz0LHxNTgTUudvxTT8NA3Bi/5Kwwf98JKylpKrUfncUijPn8Hw5s2CxMGASXUSvtx+EnsaSsLPgkMVmbzNZsDqQrdpAvdl3AXtn52w5udHRO4HUxExTnvKMsDGO4zqK/WBKUX7s8vlhUrJ7X6D2dlwX7lySwJuHPowAyjlFVBFwqtNnEsB7enGaxOkDSuxbIkKEydPwF5efjvk7Fnyk9bwClDHRIEWYgYh8y/a0bq6x3Dmgg1PndiC+N6feQVoKioQt3s3GBUR2tyM0epq+DweXixx+VbY9wA1rCS5Xk2mYLpOyabg3da/YDY5ULZvFa9DVXExUtraODbHgQNwHDzIiycclyN+kMTbTCg1FPM6TGpshOam1Ex3dmIoNzdsuiIWkDx4FZsaSngdxu3di4S6Oo7temsrbCX8eAqMWECsfQDPvLGeVwBtvbqLFyHPymLt3pERWNetg8doXLgIUE879mRD6uUvLEahgKqoiC1C19mz8Nq5UzBYCSnCH4MjMEmMSjF3q+j9l5Bu/FYMdF4MIa8NCKisN54iiraK8Zpx+Rweb3lFDFQIsyIgoPp1U+yM1P0pOVEgdIrai9/bgbSe78RAw11BA2nFVSEPrl2GXj3jm00R8nzvb5+n5H9U00hqIeL/kUPLc5HX9xN3GAkR8tn7gBzipZ3YBAX7z1Pyr7Ydx5Gah25fAHV6DdCS2nmTfBWcyzPRyuNNtV0074UhD5JbiUDwGTPwCHn3lpK/KnlEULbfRq8a2btAPlvI9PujrOkXmXo8pokI2E4x/wEv2KYDh7TO6QAAAABJRU5ErkJggg=='
  ];

  const getMessages = function getMessages() {
    // Get direct messages
    let direct = 0;

    document.querySelectorAll('[class^="numberBadge-2s8kKX"]').forEach((directElement) => {
      direct = direct + parseInt(directElement.innerHTML);
    });

    // Get indirect messages
    let indirect = 0;

    document.querySelectorAll('link[rel="icon"]').forEach((linkElement) => {
      if(iconValues.indexOf(linkElement.getAttribute('href')) !== -1) {
        indirect = 1;
      }
    });

    // Set badge
    Franz.setBadge(direct, indirect);
  };

  Franz.loop(getMessages);
  Franz.injectCSS(_path.default.join(__dirname, 'service.css'));
};
