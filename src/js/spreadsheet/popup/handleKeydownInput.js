export function handleKeydownInput(popup, element) {
  function onKeyDown() {
    if (popup) {
      popup.remove();
      element.removeEventListener('keydown', onKeyDown);
    }
  }

  element.addEventListener('keydown', onKeyDown);
}
