const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Ferdi => {
  const getMessages = () => {
    const elements = document.querySelectorAll('.taskItem');
    let count = 0;

    for (const element of elements) {
      if (element.querySelectorAll('.completed').length === 0) {
        count += 1;
      }
    }

    // set Ferdi badge
    Ferdi.setBadge(count);
  };

  Ferdi.loop(getMessages);

  Ferdi.injectCSS(_path.default.join(__dirname, 'service.css'));
};
