import { createPopup } from './createPopup';

let lastActiveTd = null;

export function showPopup(event) {
  event.preventDefault();

  const targetTd = event.target;

  if (targetTd.tagName !== 'TD') {
    return;
  }

  if (lastActiveTd && lastActiveTd !== targetTd) {
    lastActiveTd.classList.remove('dark:border-white');
    lastActiveTd.classList.add('dark:border-ys-overlay-5');
  }
  console.log('target id: ', targetTd);

  targetTd.classList.add('dark:border-white');
  targetTd.classList.remove('dark:border-ys-overlay-5');

  console.log('Target td classes', targetTd.className);

  let popup = document.getElementById('cell-popup');
  if (popup) {
    popup.remove();
  }
  console.log('targetTd after popup exists: ', targetTd.className);

  popup = createPopup(targetTd);

  const rect = targetTd.getBoundingClientRect();

  popup.classList.remove('hidden');

  popup.style.top = `${rect.top + window.scrollY + rect.height / 2 - popup.offsetHeight / 2}px`;
  popup.style.left = `${rect.left + window.scrollX + rect.width}px`;

  lastActiveTd = targetTd;
}
