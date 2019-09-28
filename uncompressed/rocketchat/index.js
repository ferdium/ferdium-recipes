'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = Franz => class RocketChat extends Franz {
  validateUrl(url) {
    return _asyncToGenerator(function* () {
      try {
        const resp = yield window.fetch(`${url}/api/info`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = yield resp.json();

        return Object.hasOwnProperty.call(data, 'version');
      } catch (err) {
        console.error(err);
      }

      return false;
    })();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvY2tldGNoYXQvaW5kZXguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIkZyYW56IiwiUm9ja2V0Q2hhdCIsInZhbGlkYXRlVXJsIiwidXJsIiwicmVzcCIsIndpbmRvdyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImRhdGEiLCJqc29uIiwiT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZXJyIiwiY29uc29sZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUFBLE9BQU9DLE9BQVAsR0FBaUJDLFNBQVMsTUFBTUMsVUFBTixTQUF5QkQsS0FBekIsQ0FBK0I7QUFDakRFLGFBQU4sQ0FBa0JDLEdBQWxCLEVBQXVCO0FBQUE7QUFDckIsVUFBSTtBQUNGLGNBQU1DLE9BQU8sTUFBTUMsT0FBT0MsS0FBUCxDQUFjLEdBQUVILEdBQUksV0FBcEIsRUFBZ0M7QUFDakRJLGtCQUFRLEtBRHlDO0FBRWpEQyxtQkFBUztBQUNQLDRCQUFnQjtBQURUO0FBRndDLFNBQWhDLENBQW5CO0FBTUEsY0FBTUMsT0FBTyxNQUFNTCxLQUFLTSxJQUFMLEVBQW5COztBQUVBLGVBQU9DLE9BQU9DLGNBQVAsQ0FBc0JDLElBQXRCLENBQTJCSixJQUEzQixFQUFpQyxTQUFqQyxDQUFQO0FBQ0QsT0FWRCxDQVVFLE9BQU9LLEdBQVAsRUFBWTtBQUNaQyxnQkFBUUMsS0FBUixDQUFjRixHQUFkO0FBQ0Q7O0FBRUQsYUFBTyxLQUFQO0FBZnFCO0FBZ0J0QjtBQWpCc0QsQ0FBekQiLCJmaWxlIjoicm9ja2V0Y2hhdC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gRnJhbnogPT4gY2xhc3MgUm9ja2V0Q2hhdCBleHRlbmRzIEZyYW56IHtcbiAgYXN5bmMgdmFsaWRhdGVVcmwodXJsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB3aW5kb3cuZmV0Y2goYCR7dXJsfS9hcGkvaW5mb2AsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwLmpzb24oKTtcblxuICAgICAgcmV0dXJuIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsICd2ZXJzaW9uJyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuIl19