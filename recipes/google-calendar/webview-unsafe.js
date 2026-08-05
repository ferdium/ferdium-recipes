let modal;
let updates = 0;

const waitFor = (condition, callback) => {
  if (condition()) {
    callback();
  } else {
    window.setTimeout(waitFor.bind(null, condition, callback), 100);
  }
};

const showModal = text => {
  modal.querySelector('p').textContent = text;
  updates += 1;
  window.ferdium.setBadge(updates);
  modal.classList.add('open');
};

const hideModal = () => {
  modal.querySelector('p').textContent = '';
  updates -= 1;
  window.ferdium.setBadge(updates);
  modal.classList.remove('open');
};

const createModal = () => {
  const modalDialog = document.createElement('div');
  modalDialog.setAttribute('id', 'franz-modal');

  // Built up with DOM calls instead of a markup string: calendar.google.com
  // sends `require-trusted-types-for 'script'`, so assigning innerHTML throws.
  const content = document.createElement('div');
  content.classList.add('modal-content');

  const close = document.createElement('span');
  close.classList.add('close');
  close.textContent = '×';
  close.addEventListener('click', hideModal);

  const message = document.createElement('p');

  content.append(close, message);
  modalDialog.append(content);

  return modalDialog;
};

window.alert = showModal;

modal = createModal();
waitFor(
  () => document.body,
  () => document.body.append(modal),
);
document.addEventListener(
  'keydown',
  event => event.key === 'Escape' && hideModal(),
);
