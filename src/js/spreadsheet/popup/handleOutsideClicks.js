export function handleOutsideClicks(popup, lastActiveTd) {
  function onClick() {
    if (popup) {
      popup.remove();
      lastActiveTd.classList.remove('border-ys-pink-500');
      lastActiveTd.classList.add(
        'dark:border-ys-overlay-5',
        'border-ys-amethyst-400',
      );
      document.removeEventListener('click', onClick);
    }
  }

  document.addEventListener('click', onClick);
}
