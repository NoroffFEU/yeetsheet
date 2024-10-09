import { saveCellValue } from '../db';
import { lastActiveTd } from './showPopup';

export function createPopup(tdElement) {
  const popup = document.createElement('div');
  popup.id = 'cell-popup';
  popup.classList.add(
    'absolute',
    'border',
    'border-ys-buttonGray',
    'shadow-lg',
    'max-h-fit',
    'p-4',
    'z-50',
    'w-72',
    'bg-ys-amethyst-400',
    'dark:bg-ys-backgroundAndText',
  );
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('absolute', 'top-0', 'right-0');

  const closeButton = document.createElement('button');
  closeButton.classList.add('w-8', 'text-ys-buttonGray');
  const closeButtonIcon = document.createElement('i');
  closeButtonIcon.classList.add('fa-solid', 'fa-x');
  closeButton.append(closeButtonIcon);
  closeButton.addEventListener('click', () => {
    popup.classList.add('hidden');
    lastActiveTd.classList.remove(
      'dark:border-ys-pink-500',
      'border-ys-pink-500',
    );
    lastActiveTd.classList.add('dark:border-ys-overlay-5');
  });

  const trashButton = document.createElement('button');
  trashButton.classList.add('w-8', 'text-ys-buttonGray');
  const trashButtonIcon = document.createElement('i');
  trashButtonIcon.classList.add('fa-solid', 'fa-trash');
  trashButton.append(trashButtonIcon);
  trashButton.addEventListener('click', () => {
    let cellId;
    const inputField = tdElement.querySelector('input');

    if (inputField) {
      inputField.value = '';
      inputField.parentElement.textContent = '';
      cellId = tdElement.parentElement.id;
      console.log('This clicks');
    } else {
      tdElement.textContent = '';
      cellId = tdElement.id;
    }

    console.log('Cell id: ', cellId);

    saveCellValue(cellId, '');

    popup.classList.add('hidden');
  });

  buttonsDiv.append(trashButton, closeButton);

  const valueHeading = document.createElement('h3');
  valueHeading.textContent = 'Value:';

  const valueInput = document.createElement('span');
  if (tdElement.tagName === 'INPUT') {
    valueInput.textContent = tdElement.value;
  } else if (tdElement.textContent.length === 0) {
    valueInput.textContent = 'No value yet.';
  } else {
    valueInput.textContent = tdElement.textContent;
  }

  popup.append(buttonsDiv, valueHeading, valueInput);

  return popup;
}
