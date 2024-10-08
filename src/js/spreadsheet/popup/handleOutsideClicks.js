export function handleOutsideClicks(popup, lastActiveTd) {
  function onClick() {
    if (popup) {
      popup.remove();
      lastActiveTd.classList.remove('dark:border-white');
      lastActiveTd.classList.add('dark:border-ys-overlay-5');
      document.removeEventListener('click', onClick);
    }
  }

  document.addEventListener('click', onClick);
}
