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
    // popup.classList.add('hidden');
    popup.remove();
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
    const spreadsheetContainer = document.getElementById(
      'spreadsheetContainer',
    );
    console.log('spreadsheet container: ', spreadsheetContainer);
    // const inputField = tdElement.querySelector('input');
    // console.log("input from createPopup: ", inputField);

    const inputField = spreadsheetContainer.querySelector('input');

    console.log('input field from spreadsheet container', inputField);

    if (inputField) {
      inputField.value = '';
      inputField.parentElement.textContent = '';
      cellId = inputField.id;
    } else {
      tdElement.textContent = '';
      cellId = tdElement.id;
    }

    console.log('cell id: ', cellId);
    saveCellValue(cellId, '');

    // popup.classList.add('hidden');
    popup.remove();
    tdElement.classList.remove('dark:border-ys-pink-500', 'border-ys-pink-500');
    tdElement.classList.add(
      'dark:border-ys-overlay-5',
      'border-ys-amethyst-400',
    );
  });

  buttonsDiv.append(trashButton, closeButton);

  const valueHeading = document.createElement('h3');
  valueHeading.textContent = 'Value:';

  const valueInput = document.createElement('span');
  if (tdElement.tagName === 'INPUT') {
    valueInput.textContent = tdElement.value || 'No value yet.';
  } else if (tdElement.textContent.length === 0) {
    valueInput.textContent = 'No value yet.';
  } else {
    valueInput.textContent = tdElement.textContent;
  }

  popup.append(buttonsDiv, valueHeading, valueInput);

  return popup;
}
