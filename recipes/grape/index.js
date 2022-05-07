function _asyncToGenerator(fn) { return function () { const gen = Reflect.apply(fn, this, arguments); return new Promise((resolve, reject) => { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then((value) => { step('next', value); }, (error) => { step('throw', error); }); } } return step('next'); }); }; }

module.exports = Ferdium => class Grape extends Ferdium {
  validateUrl(url) {
    return _asyncToGenerator(function* () {
      try {
        const resp = yield window.fetch(url, {
          method: 'GET',
        });
        return resp.status === 200;
      } catch (error) {
        console.error(error);
      }

      return false;
    })();
  }
};
