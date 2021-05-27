let modal;
let updates = 0;

const waitFor = (condition, callback) => {
  if (!condition()) {
    window.setTimeout(waitFor.bind(null, condition, callback), 100);
  } else {
    callback();
  }
};

const showModal = text => {
  modal.querySelector('p').innerHTML = text;
  updates += 1;
  window.franz.setBadge(updates);
  modal.classList.add('open');
};

const hideModal = () => {
  modal.querySelector('p').innerHTML = '';
  updates -= 1;
  window.franz.setBadge(updates);
  modal.classList.remove('open');
};

const createModal = () => {
  const franzModal = document.createElement('div');
  franzModal.setAttribute('id', 'franz-modal');
  franzModal.innerHTML = '<div class="modal-content"><span class="close">&times;</span><p></p></div>';
  franzModal.querySelector('.close').addEventListener('click', hideModal);

  return franzModal;
};

window.alert = showModal;

modal = createModal();
waitFor(() => document.body, () => document.body.appendChild(modal));
document.addEventListener('keydown', event => event.keyCode === 27 && hideModal());
