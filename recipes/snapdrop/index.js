module.exports = (Ferdium) => class Snapdrop extends Ferdium {
  modifyRequestHeaders() {
    return [
      {
        headers: {
          // TODO: Rather than hardcoding like this, the user should set it for their individual installation of Ferdium
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
        },
        requestFilters: {
          urls: ['*://*/*'],
        },
      },
    ];
  }
};
