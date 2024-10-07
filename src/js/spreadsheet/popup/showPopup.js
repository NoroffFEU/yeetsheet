import { createPopup } from './createPopup';

export function showPopup(event) {
  event.preventDefault();

  const targetTd = event.target;

  targetTd.classList.add('border', 'border-white');

  let popup = document.getElementById('cell-popup');
  if (popup) {
    popup.remove();
  }

  popup = createPopup(targetTd);

  const rect = targetTd.getBoundingClientRect();

  popup.classList.remove('hidden');

  popup.style.top = `${rect.top + window.scrollY + rect.height / 2 - popup.offsetHeight / 2}px`;
  popup.style.left = `${rect.left + window.scrollX + rect.width}px`;
}
