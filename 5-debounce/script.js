const button = document.querySelector('.button');
const elements = document.querySelectorAll('.elements__element');

function toggleElementsView() {
  elements.forEach(el => el.classList.toggle('hidden'));
}

function debounce(callback, timeout) {
  let busy = false;
  return function (...args) {
    if (busy) return;

    callback(...args);
    busy = true;
    setTimeout(() => (busy = false), timeout);
  };
}

const debouncedToggle = debounce(toggleElementsView, 1000);

button.addEventListener('click', debouncedToggle);
