const _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function show(element) {
  element.style.display = 'inherit';
}

function hide(element) {
  element.style.display = 'none';
}

module.exports = Ferdium => {
  const modal = document.createElement('div');

  const waitFor = (condition, callback) => {
    if (!condition()) {
      window.setTimeout(waitFor.bind(null, condition, callback), 100);
    } else {
      callback();
    }
  };
  function showModal(text) {
    show(modal);

    let p = modal.querySelector('p');

    if (p) {
      p.textContent = text;
    }
  }

  function hideModal() {
    hide(modal);
    let p = modal.querySelector('p');

    if (p) {
      p.textContent = '';
    }
  }

  // Replace window.alert to hide alerts in Ferdium
  const oldAlert = window.alert;
  window.alert = function () {
    // when Google Calendar displays an alert notify the user
    showModal.apply(oldAlert, arguments);
  };

  modal.id = 'franz-modal';
  modal.textContent =
    '<div class="modal-content"><span class="close">&times;</span><p></p></div>';

  let close = modal.querySelector('.close');
  if (close) {
    close.addEventListener('click', hideModal);
  }
  waitFor(
    () => document.body,
    () => document.body.append(modal),
  );

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      hideModal();
    }
  });

  Ferdium.injectCSS(_path.default.join(__dirname, 'css', 'modal.css'));
};
